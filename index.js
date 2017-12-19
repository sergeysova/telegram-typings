const { Type, Field, Store } = require('./lib/types')
const { addNatives } = require('./lib/native')
const { FlowBuilder } = require('./lib/builders/flow')


const store = new Store()

addNatives(store)

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

store.add(new Type('Foo', {}, {}))

store.add(new Type(
  'MessageEntity',
  { description: 'foobar' },
  {
    type: new Field('file_id', 'String', { description: 'Type of the entity' }),
    // offset: new Field('offset', 'Integer', { description: 'Offset in UTF-16 code units to the start of the entity' }),
    // url: new Field('url', 'String', { optional: true, description: 'For “text_link” only, url that will be opened after user taps on the text' }),
    // user: new Field('user', 'User', { optional: true, description: 'For “text_mention” only, the mentioned user' }),
    // exi: new Field('exi', 'Boolean'),
    from: new Field('from', 'Array of Array of Array of Foo', { description: 'Randofaka' }),
    allowed_updates: new Field('allowed_updates', 'Array of Boolean', { optional: true }),

  }
))

console.log(FlowBuilder.build(store).code)
