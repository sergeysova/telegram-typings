const path = require('path')
const { writeFileSync } = require('fs')

const { Store, Interface, Union } = require('./store')
const { addNatives } = require('./native')
const { requestAndParse } = require('./parser')

const { TypeScriptBuilder } = require('./builders/typescript')
const { FlowBuilder } = require('./builders/flow')
const { RustBuilder } = require('./builders/rust')


/* eslint-disable no-console */
const libJavascript = path.resolve(__dirname, '..', 'javascript')
const libRust = path.resolve(__dirname, '..', 'rust', 'src')

function buildFlow(store/*: Store*/) {
  const { code } = FlowBuilder.build(store)

  writeFileSync(path.resolve(libJavascript, 'index.js.flow'), code, { encoding: 'utf8' })
}

function buildTypeScript(store/*: Store*/) {
  const { code } = TypeScriptBuilder.build(store)

  writeFileSync(path.resolve(libJavascript, 'index.d.ts'), code, { encoding: 'utf8' })
}

function buildRust(store/*: Store*/) {
  const { code } = RustBuilder.build(store)

  writeFileSync(path.resolve(libRust, 'lib.rs'), code, { encoding: 'utf8' })
}

function addBuiltins(store) {
  store.add(new Interface('CallbackGame', {
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

  // TODO: How do I get these interfaces recognized automatically?
  store.add(new Interface('InputFile', {
    description: 'Test',
  }))
  store.add(new Interface('InputMedia', {
    description: 'Test',
  }))
  store.add(new Interface('InlineQueryResult', {
    description: 'Test',
  }))

  store.add(new Union('Integer or String', {
    nameOverride: 'IntegerOrString',
    description: 'TODO parse union properly',
  }, [
    'Integer',
    'String',
  ]))
  store.add(new Union('InlineKeyboardMarkup or ReplyKeyboardMarkup or ReplyKeyboardRemove or ForceReply', {
    nameOverride: 'InlineKeyboardMarkupOrReplyKeyboardMarkupOrReplyKeyboardRemoveOrForceReply',
    description: 'TODO parse union properly',
  }, [
    'InlineKeyboardMarkup',
    'ReplyKeyboardMarkup',
    'ReplyKeyboardRemove',
    'ForceReply',
  ]))
  store.add(new Union('InputFile or String', {
    nameOverride: 'InputFileOrString',
    description: 'TODO parse union properly',
  }, [
    'InputFile',
    'String',
  ]))
}

async function main() {
  const store = new Store()

  addNatives(store)
  addBuiltins(store)

  // The "Available types" section needs to be parsed before
  // the "Available methods" section can be parsed so that
  // the store is populated in correct order
  // FIXME: Do this logic in a non-hacky way :D
  await requestAndParse(store, 'Field')
  await requestAndParse(store, 'Parameters')

  buildFlow(store)
  buildTypeScript(store)
  buildRust(store)
}

module.exports = main
