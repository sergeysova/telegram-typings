const path = require('path')
const { writeFileSync } = require('fs')

const { Store, Type, Union } = require('../lib/store')
const { addNatives } = require('../lib/native')
const { requestAndParse } = require('../lib/parser')

const { TypeScriptBuilder } = require('../lib/builders/typescript')
const { FlowBuilder } = require('../lib/builders/flow')


/* eslint-disable no-console */
const libJavascript = path.resolve(__dirname, '..', 'javascript')

function buildFlow(store) {
  const { code } = FlowBuilder.build(store)

  writeFileSync(path.resolve(libJavascript, 'index.js.flow'), code, { encoding: 'utf8' })
}

function buildTypeScript(store) {
  const { code } = TypeScriptBuilder.build(store)

  writeFileSync(path.resolve(libJavascript, 'index.d.ts'), code, { encoding: 'utf8' })
}

function addBuiltins(store) {
  store.add(new Type('CallbackGame', {
    description: 'A placeholder, currently holds no information. Use BotFather to set up your game.',
  }))
  // TODO: remove after parse UNIONS
  store.add(new Union('InputMessageContent', {
    description: 'This object represents the content of a message to be sent as a result of an inline query.',
  }, [
    'InputTextMessageContent',
    'InputLocationMessageContent',
    'InputVenueMessageContent',
    'InputContactMessageContent',
  ]))
}

async function main() {
  const store = new Store()

  addNatives(store)
  addBuiltins(store)

  await requestAndParse(store)

  buildFlow(store)
  buildTypeScript(store)

  console.log('Build success!')
}

main().catch(error => console.error(error))
