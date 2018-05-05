const { Interface, Union /*::, Store, */ } = require('../store')


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
   */
  buildInterface(object/*: Interface*/) { // eslint-disable-line no-unused-vars
    throw new TypeError('The `buildInterface` method should be overriden')
  }

  /**
   * Converts an instance of a Union to the babel AST
   */
  buildUnion(object/*: Union*/) { // eslint-disable-line no-unused-vars
    throw new TypeError('The `buildUnion` method should be overriden')
  }

  /**
   * Wraps a type with the AST array node
   */
  buildArrayOfType(type/*: string */) { // eslint-disable-line no-unused-vars
    throw new TypeError('The `buildArrayOfType` method should be overriden')
  }

  /**
   * Wraps a type with the AST union node
   */
  buildUnionOfTypes(types/*: Array<string> */) { // eslint-disable-line no-unused-vars
    throw new TypeError('The `buildUnionOfTypes` method should be overriden')
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
  buildModule(interfaces/*: any[]*/) { // eslint-disable-line no-unused-vars
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
    return [...this.store.iterate()]
      .filter((object) => !object.native)
      .map((object) => {
        if (object instanceof Interface) {
          return this.buildInterface(object)
        }

        if (object instanceof Union) {
          const unknown = object.variants.filter((name) => !this.store.has(name))

          if (unknown.length > 0) {
            throw new TypeError(`${unknown.join(', ')} not found in the store`)
          }

          return this.buildUnion(object)
        }

        throw new TypeError('Builder supports only Union and Interface objects')
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

  buildReference(type/*: any*/)/*: any*/ {
    return type
  }

  /**
   * Create AST node to set into property name
   * @param {string} name Name of type in Store. Can be recursive `Array of TYPE`
   */
  buildNativeType(name/*: string | Array<string>*/) {
    if (Array.isArray(name)) {
      return this.buildUnionOfTypes(name)
    }

    if (name.indexOf(ARRAY_OF_LITERAL) === 0) {
      return this.buildArrayOfType(name)
    }

    const type = this.store.get(name)

    if (!type) {
      throw new TypeError(`${name} not found in store`)
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
function smartComment(description/*:string*/ = '', links/*: string[]*/ = []) {
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
