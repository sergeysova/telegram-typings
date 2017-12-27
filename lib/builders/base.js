const bt = require('@babel/types')
const { default: generate } = require('@babel/generator')
const { Type, Union /*::, Store, */ } = require('../store')


const ARRAY_OF_LITERAL = 'Array of '

/**
 * Class for creating base types.
 * @class {BaseBuilder}
 */
class BaseBuilder {
  /* :: store: Store */

  /**
   * Creates a new BaseBuilder instance
   * @param {Store} store
   */
  constructor(store/*: Store */) {
    this.store = store
  }

  /**
   * Converts an instance of a Type to the babel AST
   * @param {Type} type
   */
  buildType(type/*: Type*/) { // eslint-disable-line no-unused-vars
    throw new TypeError('Method should be overrided')
  }

  /**
   * Converts an instance of a Union to the babel AST
   * @param {Type} union
   */
  buildUnion(union/*: Union*/) { // eslint-disable-line no-unused-vars
    throw new TypeError('Method should be overrided')
  }

  /**
   * Wraps a type with the AST array node
   * @param {string} typeName
   */
  buildArrayType(typeName/*: string */) { // eslint-disable-line no-unused-vars
    throw new TypeError('The `buildArrayType` method should be overriden')
  }

  /**
   * Convert list of types to list of AST nodes
   * Apply only non native types
   */
  iterateOverTypes() {
    return [...this.store.models()]
      .filter(type => !type.native)
      .map((type) => {
        if (type instanceof Type) {
          return this.buildType(type)
        }
        if (type instanceof Union) {
          const notFound = type.variants.filter(name => !this.store.has(name))

          if (notFound.length > 0) {
            throw new TypeError(`${notFound[0]} not found in Store`)
          }
          return this.buildUnion(type)
        }
        throw new TypeError('Builder supports only Union and Type')
      })
      .filter(ast => !!ast)
  }

  /**
   * Create source code from store of types
   */
  build()/*: { code: string }*/ {
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

  buildBooleanLiteral(value/*: boolean*/) {
    return value ? 'true' : 'false'
  }

  buildReference/*::<T>*/(name/*: T*/)/*: T*/ {
    return name
  }

  /**
   * Create AST node to set into property name
   * @param {string} typeName Name of type in Store. Can be recursive `Array of TYPE`
   */
  buildNativeType(typeName/*: string*/) {
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

    return this.buildReference(type.build())
  }

  static build(store/*: Store */) {
    return new this(store).build()
  }
}

/**
 * Create CommentBlock AST node
 */
function commentBlock(value/*: string*/) {
  return {
    type: 'CommentBlock',
    value,
  }
}

/**
 * Split description to lines add return AST node
 */
function smartComment(description/* :: :string */ = '', links/*: string[]*/ = []) {
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
