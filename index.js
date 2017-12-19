const path = require('path')
const { writeFileSync } = require('fs')
const cheerio = require('cheerio')
const fetch = require('node-fetch')

const { Type, Field, Store } = require('./lib/types')
const { addNatives } = require('./lib/native')
const { FlowBuilder } = require('./lib/builders/flow')
const { TypeScriptBuilder } = require('./lib/builders/typescript')

/* eslint-disable no-console */

const API_URL = 'https://core.telegram.org/bots/api'
const store = new Store()

addNatives(store)

/**
 *
 * @param {stirng} type
 * @param {Cheerio} element
 */
function findBack(type, element) {
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
 *
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
 *
 * @param {CheerioElement} $
 */
function parseType($) {
  const el = cheerio($)
}

async function main() {
  const result = await (await fetch(API_URL)).text()
  const $ = cheerio.load(result)
  const tables = $('body').find('table')

  await new Promise((resolve) => {
    tables.each((index, element) => {
      const table = cheerio(element)
      const type = table.find('tr:first-child td:first-child').text()

      if (type === 'Field') {
        const name = findBack('h4', table)
        const description = findNext('p', name)

        if (name.text().includes(' ')) {
          console.warn('ERROR:', name.text())
          return
        }

        // console.log({ name: name.text(), description: description.text() })

        store.add(new Type(
          name.text(),
          { description: description.text() },
          {}
        ))

        if (tables.length - 1 === index) {
          resolve()
        }
      } // if type === Field
    })
  })

  const sourceFlow = FlowBuilder.build(store).code
  const sourceTs = TypeScriptBuilder.build(store).code

  writeFileSync(path.resolve('index.js.flow'), sourceFlow)
  writeFileSync(path.resolve('index.d.ts'), sourceTs)
}

main().catch(error => console.log(error))
