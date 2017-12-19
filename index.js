const path = require('path')
const { writeFileSync } = require('fs')
const cheerio = require('cheerio')
const fetch = require('node-fetch')

const { Type, Field, Store } = require('./lib/types')
const { addNatives } = require('./lib/native')
const { FlowBuilder } = require('./lib/builders/flow')
const { TypeScriptBuilder } = require('./lib/builders/typescript')


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

  writeFileSync(path.resolve(__dirname, 'telegram-typings.flow.js'), sourceFlow, { encoding: 'utf8' })
  writeFileSync(path.resolve(__dirname, 'telegram-typings.d.ts'), sourceTs, { encoding: 'utf8' })
}

main().catch(error => console.log(error))


// store.add(new Type(
//   'User',
//   { description: 'This object represents a Telegram user or bot.' },
//   {
//     id: new Field('id', 'Integer', { description: 'Unique identifier for this user or bot' }),
//     is_bot: new Field('is_bot', 'Boolean', { description: 'True, if this user is a bot' }),
//     first_name: new Field('first_name', 'String', { description: 'User‘s or bot’s first name' }),
//     last_name: new Field('last_name', 'String', { optional: true, description: 'User‘s or bot’s last name' }),
//     username: new Field('username', 'String', { optional: true, description: 'User‘s or bot’s username' }),
//     language_code: new Field('language_code', 'String', { optional: true, description: 'IETF language tag of the user\'s language' }),
//   }
// ))

// store.add(new Type('Foo', {}, {}))

// store.add(new Type(
//   'MessageEntity',
//   { description: 'foobar' },
//   {
//     type: new Field('file_id', 'String', { description: 'Type of the entity' }),
//     offset: new Field('offset', 'Integer', { description: 'Offset in UTF-16 code units to the start of the entity' }),
//     url: new Field('url', 'String', { optional: true, description: 'For “text_link” only, url that will be opened after user taps on the text' }),
//     user: new Field('user', 'User', { optional: true, description: 'For “text_mention” only, the mentioned user' }),
//     exi: new Field('exi', 'Boolean'),
//     from: new Field('from', 'Array of Array of Array of Float number', { description: 'Randofaka' }),
//     allowed_updates: new Field('allowed_updates', 'Array of Boolean', { optional: true }),

//   }
// ))

// console.log(FlowBuilder.build(store).code)
