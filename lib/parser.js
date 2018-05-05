const cheerio = require('cheerio')
/*:: import type { Cheerio, CheerioStatic, CheerioElement } from 'cheerio'*/
const { default: fetch } = require('node-fetch')
const debug = require('debug')('tt:parser')

// eslint-disable-next-line no-unused-vars
const { Interface, Field, Store } = require('./store')


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

    if (type === 'Field') {
      const name = findPrev('h4', table)
      const description = findNext('p', name)

      if (name.text().includes(' ')) {
        console.warn('WRONG NAME:', name.text())
        continue // eslint-disable-line no-continue
      }

      const fields = {}
      const rows = await toArray(table.find('tr'))

      for (const row of rows) {
        const [flName, flType, flDescr] = await toArray(row.find('td'))
        const links = parseLinks(flDescr)

        const fieldName = flName.text().trim()
        let fieldType = flType.text().trim()
        let fieldDescription = flDescr.text().trim()
        let optional = false

        if (fieldName === 'Field' || fieldName === 'Parameters') {
          continue // eslint-disable-line no-continue
        }

        if (fieldType.includes(' or ')) {
          fieldType = fieldType.split(' or ')
        }

        if (fieldDescription.includes('Optional.')) {
          optional = true
          fieldDescription = fieldDescription.replace('Optional.', '').trim()
        }

        if (Array.isArray(fieldType)) {
          debug(`${name.text().trim()}.${fieldName}: ${fieldType.join(' | ')} ::: ${fieldDescription}`)
        }
        else {
          debug(`${name.text().trim()}.${fieldName}: ${fieldType} ::: ${fieldDescription}`)
        }

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

      store.add(typeClass)

      debug(name.text(), ':::', description.text())
    }
  }

  return store
}

module.exports = {
  requestAndParse,
}
