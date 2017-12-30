const { Type/*::, Store*/ } = require('./store')


class NativeBoolean extends Type {
  constructor() {
    super('Boolean', { native: true }, {})
  }
}

class NativeTrue extends Type {
  constructor() {
    super('True', { native: true }, {})
  }
}

class NativeInteger extends Type {
  constructor() {
    super('Integer', { native: true }, {})
  }
}

class NativeFloat extends Type {
  constructor() {
    super('Float', { native: true }, {})
  }
}

/**
 * @see https://core.telegram.org/bots/api#inlinequeryresultlocation
 */
class NativeFloatNumber extends Type {
  constructor() {
    super('Float number', { native: true }, {})
  }
}

class NativeString extends Type {
  constructor() {
    super('String', { native: true }, {})
  }
}

function addNatives(store/*: Store*/) {
  store.add(new NativeBoolean())
  store.add(new NativeTrue())
  store.add(new NativeInteger())
  store.add(new NativeFloat())
  store.add(new NativeFloatNumber())
  store.add(new NativeString())
}

module.exports = {
  NativeBoolean,
  NativeTrue,
  NativeInteger,
  NativeFloat,
  NativeFloatNumber,
  NativeString,

  addNatives,
}
