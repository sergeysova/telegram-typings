
const cheerio = require('cheerio')
const fetch = require('node-fetch')
const debug = require('debug')('tt:parser')

// eslint-disable-next-line no-unused-vars
const { Type, Field, Store } = require('./store')


/* eslint-disable no-console, no-magic-numbers */

const API_URL = 'https://core.telegram.org/bots/api'

/**
 * Find previous special typed element in siblings
 * @param {string} type
 * @param {Cheerio} element
 */
function findPrev(type, element) {
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
 * @param {Cheerio} target
 * @param {Function} mapFn
 */
function toArray(target, mapFn) {
  return new Promise((resolve) => {
    const arr = []

    target.each((index, element) => {
      arr.push(mapFn ? mapFn(element) : element)

      if (target.length - 1 === index) {
        resolve(arr)
      }
    })
  })
}

async function parseFields(table) { // eslint-disable-line no-unused-vars

}

/**
 * @param {Cheerio} description
 * @return {Promise<Array<Cheerio>>}
 */
function parseLinks(description) {
  const links = Array.from(description.find('a'))
    .map(link => cheerio(link).attr('href'))
    .map(linkStr => (
      linkStr.startsWith('http')
        ? linkStr
        : `https://core.telegram.org/bots/api${linkStr}`
    ))

  return Array.from(new Set(links))
}

/**
 *
 * @param {Store} store
 */
async function requestAndParse(store) {
  const result = await (await fetch(API_URL)).text()
  const $ = cheerio.load(result)
  const tables = $('body').find('table')

  /** @type {Array<Cheerio>} */
  const list = await toArray(tables, cheerio)

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
      const rows = await toArray(table.find('tr'), cheerio)

      for (const row of rows) {
        const [flName, flType, flDescr] = await toArray(row.find('td'), cheerio)
        const links = parseLinks(flDescr)

        const fieldName = flName.text().trim()
        const fieldType = flType.text().trim()
        let fieldDescr = flDescr.text().trim()
        let optional = false

        if (fieldName === 'Field' || fieldName === 'Parameters') {
          continue // eslint-disable-line no-continue
        }

        if (fieldDescr.includes('Optional.')) {
          optional = true
          fieldDescr = fieldDescr.replace('Optional.', '').trim()
        }

        debug(`${name.text().trim()}.${fieldName}: ${fieldType} ::: ${fieldDescr}`)

        const field = new Field(
          fieldName,
          fieldType,
          {
            description: fieldDescr,
            links,
            optional,
          }
        )

        fields[field.name] = field
      }

      const typeClass = new Type(
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
