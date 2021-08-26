const path = require('path')
const { writeFileSync } = require('fs')

const { Store, Interface, Union, Field } = require('./store')
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
  store.add(new Interface('InputFile', {
    description: 'This object represents the contents of a file to be uploaded. '
      + 'Must be posted using multipart/form-data in the usual way that files are uploaded via the browser.',
  }))
  store.add(new Interface('PassportData', {
    description: 'Contains information about Telegram Passport data shared with the bot by the user.',
  }, {
    data: new Field('data', 'Array of EncryptedPassportElement'),
    credentials: new Field('credentials', 'EncryptedCredentials'),
  }))
  store.add(new Interface('EncryptedPassportElement', {
    desciption: 'Contains information about documents or other Telegram Passport elements shared with the bot by the user.',
  }))
  store.add(new Interface('EncryptedCredentials', {
    description: 'Contains data required for decrypting and authenticating EncryptedPassportElement.'
      + ' See the Telegram Passport Documentation for a complete description of the data decryption'
      + ' and authentication processes.',
  }))
  store.add(new Interface('VoiceChatStarted', {
    description: 'This object represents a service message about a voice chat started in the chat. Currently holds no information.',
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
    'InputMediaAudio',
    'InputMediaDocument',
    'InputMediaAnimation',
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
  store.add(new Union('PassportElementError', {
    description: 'This object represents an error in the Telegram Passport element which was submitted that should be resolved by the user',
  }, [
    'PassportElementErrorDataField',
    'PassportElementErrorFrontSide',
    'PassportElementErrorReverseSide',
    'PassportElementErrorSelfie',
    'PassportElementErrorFile',
    'PassportElementErrorFiles',
    'PassportElementErrorTranslationFile',
    'PassportElementErrorTranslationFiles',
    'PassportElementErrorUnspecified',
  ]))
  store.add(new Union('ChatMember', {
    description: 'This object contains information about one member of a chat. Currently, the following 6 types of chat members are supported:',
  }, [
    'ChatMemberOwner',
    'ChatMemberAdministrator',
    'ChatMemberMember',
    'ChatMemberRestricted',
    'ChatMemberLeft',
    'ChatMemberBanned',
  ]))
  store.add(new Union('BotCommandScope', {
    description: 'This object represents the scope to which bot commands are applied. Currently, the following 7 scopes are supported:',
  }, [
    'BotCommandScopeDefault',
    'BotCommandScopeAllPrivateChats',
    'BotCommandScopeAllGroupChats',
    'BotCommandScopeAllChatAdministrators',
    'BotCommandScopeChat',
    'BotCommandScopeChatAdministrators',
    'BotCommandScopeChatMember',
  ]))
}

async function main() {
  const store = new Store()

  addNatives(store)
  addBuiltins(store)

  await requestAndParse(store)

  buildFlow(store)
  buildTypeScript(store)
  // buildRust(store)
}

module.exports = main
