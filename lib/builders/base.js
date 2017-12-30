const { Type, Union /*::, Store, */ } = require('../store')


const ARRAY_OF_LITERAL = 'Array of '

/**
 * Class for creating base types.
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
    throw new TypeError('The `buildType` method should be overriden')
  }

  /**
   * Converts an instance of a Union to the babel AST
   * @param {Type} union
   */
  buildUnion(union/*: Union*/) { // eslint-disable-line no-unused-vars
    throw new TypeError('The `buildUnion` method should be overriden')
  }

  /**
   * Wraps a type with the AST array node
   * @param {string} typeName
   */
  buildArrayType(typeName/*: string */) { // eslint-disable-line no-unused-vars
    throw new TypeError('The `buildArrayType` method should be overriden')
  }

  /**
   * Create root ast for file
   */
  buildProgram(body/*: mixed*/) { // eslint-disable-line no-unused-vars
    throw new TypeError('The `buildProgram` should be overriden')
  }

  /**
   * Wrap statements to a module
   */
  buildModule(types/*: mixed[]*/)/*: mixed[]*/ { // eslint-disable-line no-unused-vars
    throw new TypeError('The `buildModule` method should be overriden')
  }

  /**
   * Convert lines of comments to code
   */
  buildCommentBlock(lines/*: string[]*/) { // eslint-disable-line no-unused-vars
    throw new TypeError('The `buildCommentBlock` method should be overriden')
  }

  /**
   * Convert link to see comment
   */
  buildCommentSeeLink(link/*: string*/) { // eslint-disable-line no-unused-vars
    throw new TypeError('The `buildCommentSeeLink` method should be overriden')
  }

  /**
   * Convert description and links to comment code
   */
  buildComments(description/*: string*/ = '', links/*: string[]*/ = []) {
    const lines = description.replace(/(.{1,72}\s)\s*?/g, '\n$1').split('\n')

    return this.buildCommentBlock(lines.concat(links.map(this.buildCommentSeeLink)))
  }

  /**
   * Create source code from store of types
   */
  build()/*: { code: string }*/ {
    const types = this.iterateOverTypes()

    return this.buildProgram(this.buildModule(types))
    // return generate(bt.program(this.buildModule(types), [], 'module'))
  }

  /**
   * Convert list of types to list of AST nodes
   * Apply only non native types
   */
  iterateOverTypes() {
    return [...this.store.models()]
      .filter((type) => !type.native)
      .map((type) => {
        if (type instanceof Type) {
          return this.buildType(type)
        }
        if (type instanceof Union) {
          const notFound = type.variants.filter((name) => !this.store.has(name))

          if (notFound.length > 0) {
            throw new TypeError(`${notFound[0]} not found in Store`)
          }
          return this.buildUnion(type)
        }
        throw new TypeError('Builder supports Union and Type obje')
      })
      .filter((ast) => !!ast)
  }

  buildFloat() {
    return 'number'
  }

  buildInteger() {
    return 'integer'
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
          return this.buildInteger()

        case 'float':
        case 'float number':
          return this.buildFloat()

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
