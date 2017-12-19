
const isType = Symbol('Type.isType')
const isField = Symbol('Field.isField')

/* eslint-disable class-methods-use-this */

class Type {
  constructor(name, { description = undefined, links = [], native = false }, fields = {}) {
    this.name = name
    this.fields = fields
    this.description = description
    this.links = links
    this.native = native
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

class Field {
  constructor(name, type, { optional = false, description = undefined, links = [] } = {}) {
    this.name = name
    this.type = type
    this.optional = optional
    this.description = description
    this.links = links
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

  add(type) {
    this.types.set(type.name, type)
  }

  get(typeName) {
    return this.types.get(typeName)
  }

  has(typeName) {
    return this.types.has(typeName)
  }

  * [Symbol.iterator]() {
    yield* this.types.values()
  }
}

module.exports = {
  Type,
  Field,
  Store,
}
