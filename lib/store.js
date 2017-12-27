
const isType = Symbol('Type.isType')
const isField = Symbol('Field.isField')
const isUnion = Symbol('Union.isUnion')

/* eslint-disable class-methods-use-this */

class Type {
  constructor(name, { description = undefined, links = [], native = false }, fields = {}) {
    this.name = name
    this.links = links
    this.fields = fields
    this.native = native
    this.description = description
  }

  [isType]() {
    return true
  }

  build() {
    return this.name
  }

  static isType(target) {
    return target[isType] && target[isType]()
  }
}

class Union {
  constructor(name, { description, links = [], native = false }, variants = []) {
    this.name = name
    this.links = links
    this.native = native
    this.variants = variants
    this.description = description
  }

  [isUnion]() {
    return true
  }

  build() {
    return this.name
  }

  static isUnion(target) {
    return target[isUnion] && target[isUnion]()
  }
}

class Field {
  constructor(name, type, { optional = false, description, links = [] } = {}) {
    this.name = name
    this.type = type
    this.links = links
    this.optional = optional
    this.description = description
  }

  [isField]() {
    return true
  }

  static isField(target) {
    return target[isField] && target[isField]()
  }
}

class Store {
  constructor() {
    this.types = new Map()
  }

  add(target) {
    if (!Union.isUnion(target) && !Type.isType(target)) {
      throw new TypeError('Store supports only Type and Union')
    }
    this.types.set(target.name, target)
  }

  get(targetName) {
    return this.types.get(targetName)
  }

  has(targetName) {
    return this.types.has(targetName)
  }

  * [Symbol.iterator]() {
    yield* this.types.values()
  }

  serialize() {
    return [...this.types.values()]
      .reduce((acc, type) => {
        if (Type.isType(type)) {
          acc.types[type.name] = type
        }
        else if (Union.isUnion(type)) {
          acc.unions[type.name] = type
        }

        return acc
      }, { types: {}, unions: {}})
  }
}

module.exports = {
  Type,
  Union,
  Field,
  Store,
}
