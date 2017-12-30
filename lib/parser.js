/* eslint-disable no-console, no-magic-numbers, no-param-reassign */

const cheerio = require('cheerio')
const { default: fetch } = require('node-fetch')
// const debug = require('debug')('tt:parser')

// eslint-disable-next-line no-unused-vars
const { Type, Field, Store } = require('./store')


const API_URL = 'https://core.telegram.org/bots/api'

/**
 * Find previous special typed element in siblings
 * @param {string} dir The direction
 * @param {string} type The type
 * @param {Cheerio} element The element
 * @param {number} tries The tries
 * @return {Cheerio}
 */
function findElement(dir, type, element, tries = 5) {
  do {
    if (element.is(type)) {
      return element
    }
    element = element[dir]()
  }
  while (--tries)

  return element
}

/**
 * Find previous special typed element in siblings
 * @param {string} type The type
 * @param {Cheerio} element The element
 * @param {number} tries Tries
 * @return {Cheerio}
 */
function findPrev(type, element, tries = 5) {
  return findElement('prev', type, element, tries)
}

/**
 * Find next special typed element in siblings
 * @param {string} type The type
 * @param {Cheerio} element The element
 * @param {number} tries The tries
 * @return {Cheerio}
 */
function findNext(type, element, tries = 5) {
  return findElement('next', type, element, tries)
}

/**
 * Convert list with `.each()` and `.length` to classic array
 * @param {Cheerio} target
 * @param {Function} mapper
 * @return {Promise}
 */
function toArray(target, mapper) {
  return new Promise((resolve) => {
    const arr = []

    target.each((index, element) => {
      arr.push(mapper ? mapper(element) : element)

      if (target.length - 1 === index) {
        resolve(arr)
      }
    })
  })
}

/**
 * Parse fields from table function
 *
 * @param {Cheerio} table The table
 * @return {Promise}
 */
async function parseFields(table) { // eslint-disable-line no-unused-vars
  return undefined
}

/**
 * Parse links from a description
 *
 * @param {Cheerio} description
 * @return {Array}
 */
function parseLinks(description) {
  const links = Array.from(description.find('a'))
    .map((link) => cheerio(link).attr('href'))
    .map((linkStr) => (
      linkStr.startsWith('http')
        ? linkStr
        : `https://core.telegram.org/bots/api${linkStr}`
    ))

  return Array.from(new Set(links))
}

/**
 * Get HTTP request and run parser then
 *
 * @param {Store} store
 * @return {Store}
 */
async function requestAndParse(store/* : Store */) {
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
        let fieldDescription = flDescr.text().trim()
        let optional = false

        if (fieldName === 'Field' || fieldName === 'Parameters') {
          continue // eslint-disable-line no-continue
        }

        if (fieldDescription.includes('Optional.')) {
          optional = true
          fieldDescription = fieldDescription.replace('Optional.', '').trim()
        }

        // debug(`${name.text().trim()}.${fieldName}: ${fieldType} ::: ${fieldDescription}`)

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

      const typeClass = new Type(
        name.text().trim(),
        { description: description.text().trim(), links: parseLinks(description) },
        fields
      )

      store.add(typeClass)

      // debug(name.text(), ':::', description.text())
    }
  }

  let previous

  const unions = Array.from($('#dev_page_content').children())
    .reduce((acc, element, idx) => {
      if (!Array.isArray(acc)) {
        acc = []
      }

      if ((element.name === 'h4' && $(element).text().match(/^[a-zA-Z]+$/))
        || (element.name === 'p' && previous === idx - 1)
        || (element.name === 'table' && previous === idx - 1)) {
        // console.log($(element))
        previous = idx
        acc.push($(element))
      }

      return acc
    })

  // console.log(unions)
  console.log(unions.length)

  return store
}

module.exports = {
  requestAndParse,
}
