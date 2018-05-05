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
  store.add(new Union('InputMedia', {
    description: 'This object represents the content of a media message to be sent.',
  }, [
    'InputMediaPhoto',
    'InputMediaVideo',
  ]))
  store.add(new Union('InlineQueryResult', {
    description: 'This object represents one result of an inline query',
  }, [
    'InlineQueryResultCachedAudio',
    'InlineQueryResultCachedDocument',
    'InlineQueryResultCachedGif',
    'InlineQueryResultCachedMpeg4Gif',
    'InlineQueryResultCachedPhoto',
    'InlineQueryResultCachedSticker',
    'InlineQueryResultCachedVideo',
    'InlineQueryResultCachedVoice',
    'InlineQueryResultArticle',
    'InlineQueryResultAudio',
    'InlineQueryResultContact',
    'InlineQueryResultGame',
    'InlineQueryResultDocument',
    'InlineQueryResultGif',
    'InlineQueryResultLocation',
    'InlineQueryResultMpeg4Gif',
    'InlineQueryResultPhoto',
    'InlineQueryResultVenue',
    'InlineQueryResultVideo',
    'InlineQueryResultVoice',
  ]))
}

async function main() {
  const store = new Store()

  addNatives(store)
  addBuiltins(store)

  await requestAndParse(store)

  buildFlow(store)
  buildTypeScript(store)
  buildRust(store)
}

module.exports = main
