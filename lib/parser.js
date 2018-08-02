const cheerio = require('cheerio')
/*:: import type { Cheerio, CheerioStatic, CheerioElement } from 'cheerio'*/
const { default: fetch } = require('node-fetch')
const debug = require('debug')('tt:parser')

// eslint-disable-next-line no-unused-vars
const { Interface, Method, Field, Store } = require('./store')


/* eslint-disable no-console, no-magic-numbers */

const API_URL = 'https://core.telegram.org/bots/api'

/**
 * Find previous special typed element in siblings
 */
function findPrev(type/*: string*/, element/*: Cheerio*/) {
  let tries = 5
  let prev = element

  do {
    if (prev.is(type)) {
      return prev
    }

    prev = prev.prev()
  }
  while (--tries)

  return prev
}

/**
 * Find next special typed element in siblings
 * @param {string} type
 * @param {Cheerio} element
 */
function findNext(type, element) {
  let tries = 5
  let next = element

  do {
    if (next.is(type)) {
      return next
    }

    next = next.next()
  }
  while (--tries)

  return next
}

/**
 * Convert list with `.each()` and `.length` to classic array
 */
function toArray(target/*: Cheerio*/)/*: Promise<Cheerio[]>*/ {
  return new Promise((resolve) => {
    const arr/*: Cheerio[]*/ = []

    target.each((index, element/*: CheerioElement*/) => {
      arr.push(cheerio(element))

      if (target.length - 1 === index) {
        resolve(arr)
      }
    })
  })
}

async function parseFields(table) { // eslint-disable-line no-unused-vars
  return undefined
}

/**
 * @param {Cheerio} description
 * @return {Promise<Array<Cheerio>>}
 */
function parseLinks(description/*: Cheerio*/) {
  const links = description.find('a').toArray()
    .map((element) => cheerio(element).attr('href'))
    .map((linkStr) => (
      linkStr.startsWith('http')
        ? linkStr
        : `https://core.telegram.org/bots/api${linkStr}`
    ))

  return [...new Set(links)]
}

async function handleInterface({ name, description, rows }) {
  const fields = {}

  for (const row of rows) {
    const [flName, flType, flDescr] = await toArray(row.find('td'))
    let fieldDescription
    let optional = false

    fieldDescription = flDescr.text().trim()
    if (fieldDescription.includes('Optional.')) {
      optional = true
      fieldDescription = fieldDescription.replace('Optional.', '').trim()
    }
    const links = parseLinks(flDescr)

    const fieldName = flName.text().trim()
    let fieldType = flType.text().trim()

    if (['Field', 'Parameters'].includes(fieldName)) {
      continue // eslint-disable-line no-continue
    }

    if (fieldType.includes(' or ')) {
      fieldType = fieldType.split(' or ')
    }

    debug(`${name.text().trim()}.${fieldName}: ${Array.isArray(fieldType) ? fieldType.join(' | ') : fieldType} ::: ${fieldDescription}`)

    const field = new Field(
      fieldName,
      fieldType,
      {
        description: fieldDescription,
        links,
        optional,
      }
    )

    fields[field.name] = field
  }

  const typeClass = new Interface(
    name.text().trim(),
    { description: description.text().trim(), links: parseLinks(description) },
    fields
  )

  debug(name.text(), ':::', description.text())

  return typeClass
}


async function handleMethod({ name, description, rows }) {
  const fields = {}

  for (const row of rows) {
    const [flName, flType, flRequired, flDescr] = await toArray(row.find('td'))
    const fieldDescription = flDescr.text().trim()
    const optional = flRequired.text().trim() === 'Optional'

    const links = parseLinks(flDescr)

    const fieldName = flName.text().trim()
    let fieldType = flType.text().trim()

    if (['Field', 'Parameters'].includes(fieldName)) {
      continue // eslint-disable-line no-continue
    }

    if (fieldType.includes(' or ')) {
      fieldType = fieldType.split(' or ')
    }

    debug(`${name.text().trim()}.${fieldName}: ${Array.isArray(fieldType) ? fieldType.join(' | ') : fieldType} ::: ${fieldDescription}`)

    const field = new Field(
      fieldName,
      fieldType,
      {
        description: fieldDescription,
        links,
        optional,
      }
    )

    fields[field.name] = field
  }

  const typeClass = new Method(
    name.text().trim(),
    { description: description.text().trim(), links: parseLinks(description) },
    fields
  )

  debug(name.text(), ':::', description.text())

  return typeClass
}

/**
 *
 * @param {Store} store
 */
async function requestAndParse(store/*: Store*/) {
  const result = await (await fetch(API_URL)).text()
  const body = cheerio.load(result)
  const tables/*: Cheerio*/ = body('body').find('table')

  /** @type {Array<Cheerio>} */
  const list = await toArray(tables)

  for (const table of list) {
    const type = table.find('tr:first-child td:first-child').text()

    let typeClass

    if (!['Field', 'Parameters'].includes(type)) {
      continue // eslint-disable-line no-continue
    }

    const name = findPrev('h4', table)
    const description = findNext('p', name)

    if (name.text().includes(' ')) {
      console.warn('WRONG NAME:', name.text())
      continue // eslint-disable-line no-continue
    }

    const rows = await toArray(table.find('tr'))

    if (type === 'Field') {
      typeClass = await handleInterface({ name, description, rows })
    }
    // else if (type === 'Parameters') {
    //   typeClass = await handleMethod({ name, description, rows })
    // }

    if (!typeClass) {
      continue // eslint-disable-line no-continue
    }

    store.add(typeClass)
  }

  return store
}

module.exports = {
  requestAndParse,
}
