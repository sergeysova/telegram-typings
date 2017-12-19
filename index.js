const { Type, Field, Store } = require('./lib/types')
const { FlowBuilder } = require('./lib/builders/flow')


const store = new Store()

store.add(new Type('User', {}, { description: 'Hello my dear world' }))

store.add(new Type('MessageEntity', {
  type: new Field('file_id', 'String', { description: 'Type of the entity' }),
  offset: new Field('offset', 'Integer', { description: 'Offset in UTF-16 code units to the start of the entity' }),
  url: new Field('url', 'String', { optional: true, description: 'For “text_link” only, url that will be opened after user taps on the text' }),
  user: new Field('user', 'User', { optional: true, description: 'For “text_mention” only, the mentioned user' }),
  exi: new Field('exi', 'Boolean'),

}, { description: 'foobar' }))

console.log(FlowBuilder.build(store).code)
