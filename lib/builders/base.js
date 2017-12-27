const bt = require('@babel/types')
const { default: generate } = require('@babel/generator')
const { Type, Union } = require('../store')


const ARRAY_OF_LITERAL = 'Array of '

/**
 * Class for creating base types.
 * @class {BaseBuilder}
 */
class BaseBuilder {
  /**
   * Creates a new BaseBuilder instance
   * @param {Store} store
   */
  constructor(store) {
    this.store = store
  }

  /**
   * Converts an instance of a Type to the babel AST
   * @param {Type} type
   */
  buildType(type) { // eslint-disable-line no-unused-vars
    throw new TypeError('The `buildType` method should be overriden')
  }

  /**
   * Converts an instance of a Union to the babel AST
   * @param {Type} union
   */
  buildUnion(union) { // eslint-disable-line no-unused-vars
    throw new TypeError('The `buildUnion` method should be overriden')
  }

  /**
   * Wraps a type with the AST array node
   * @param {string} typeName
   */
  buildArrayType(typeName) { // eslint-disable-line no-unused-vars
    throw new TypeError('The `buildArrayType` method should be overriden')
  }

  /**
   * Convert list of types to list of AST nodes
   * Apply only non native types
   */
  iterateOverTypes() {
    return [...this.store]
      .filter(type => !type.native)
      .map((type) => {
        if (Type.isType(type)) {
          return this.buildType(type)
        }
        if (Union.isUnion(type)) {
          const notFound = type.variants.filter(name => !this.store.has(name))

          if (notFound.length > 0) {
            throw new TypeError(`${notFound[0]} not found in Store`)
          }
          return this.buildUnion(type)
        }
        throw new TypeError('Builder supports Union and Type obje')
      })
      .filter(e => !!e)
  }

  /**
   * Create source code from store of types
   */
  build() {
    const types = this.iterateOverTypes()

    return generate(bt.program(types, [], 'module'))
  }

  buildNumber() {
    return 'number'
  }

  buildString() {
    return 'string'
  }

  buildBoolean() {
    return 'boolean'
  }

  buildBooleanLiteral(value) {
    return value ? 'true' : 'false'
  }

  buildReference(name) {
    return name
  }

  /**
   * Create AST node to set into property name
   * @param {string} typeName Name of type in Store. Can be recursive `Array of TYPE`
   */
  buildNativeType(typeName) {
    if (typeName.indexOf(ARRAY_OF_LITERAL) === 0) {
      return this.buildArrayType(typeName)
    }

    const type = this.store.get(typeName)

    if (!type) {
      throw new TypeError(`${typeName} not found in store`)
    }

    if (type.native) {
      switch (type.name.toLowerCase()) {
        case 'integer':
        case 'float':
        case 'float number':
          return this.buildNumber()

        case 'string':
          return this.buildString()

        case 'boolean':
          return this.buildBoolean()

        case 'true':
          return this.buildBooleanLiteral(true)

        default:
          return this.buildReference(type.name)
      }
    }

    return this.buildReference(this.store.get(typeName).build())
  }

  static build(store) {
    return new this(store).build()
  }
}

/**
 * Create CommentBlock AST node
 * @param {string} value
 * @return {BabelTypes.Node}
 */
function commentBlock(value) {
  return {
    type: 'CommentBlock',
    value,
  }
}

/**
 * Split description to lines add return AST node
 * @param {string} description
 * @param {Array<string>} links
 * @returns {BabelTypes.Node}
 */
function smartComment(description = '', links = []) {
  const descriptionLines = description.replace(/(.{1,72}\s)\s*?/g, '\n * $1')
  const linksLines = links.reduce((acc, link) => (
    `${acc} * @see ${link}\n`
  ), '')

  return commentBlock(`*${descriptionLines}\n${linksLines} `)
}

module.exports = {
  BaseBuilder,
  commentBlock,
  smartComment,
  ARRAY_OF_LITERAL,
}
