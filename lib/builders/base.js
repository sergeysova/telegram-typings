const bt = require('@babel/types')
const { default: generate } = require('@babel/generator')


const ARRAY_OF_LITERAL = 'Array of '

/**
 * Class to create base objects.
 *
 * @class     {BaseBuilder}
 */
class BaseBuilder {
  /**
   * Constructs the BaseBuilder object.
   *
   * @param     {Store}  store  The store instance
   */
  constructor(store) {
    this.store = store
  }

  /**
   * Builds a type.
   *
   * @param      {Type}       type  The type
   * @throws     {TypeError}
   */
  /* eslint-disable no-unused-vars */
  buildType(type) {
  /* eslint-enable no-unused-vars */
    throw new TypeError('Method `buildType` should be overriden!')
  }

  /**
   * Iterates over types
   *
   * @return     {Array}
   */
  iterateOverTypes() {
    return [...this.store]
      .filter(type => !type.native)
      .map(type => this.buildType(type))
  }

  /**
   * Runs generator
   *
   * @return     {string}
   */
  build() {
    const types = this.iterateOverTypes()

    return generate(bt.program(types, [], 'module'))
  }

  /**
   * Builds a native type.
   *
   * @param      {string}  typeName  The type name
   * @return     {string}
   */
  buildNativeType(typeName) {
    if (typeName.indexOf(ARRAY_OF_LITERAL) === 0) {
      return this.buildArrayType(typeName.substr(ARRAY_OF_LITERAL.length))
    }

    if (!this.store.has(typeName)) {
      throw new TypeError(`The ${typeName} not found in the store.`)
    }

    const type = this.store.get(typeName)

    if (type.native) {
      switch (type.name.toLowerCase()) {
        case 'integer':
        case 'float':
        case 'float number':
          return bt.numberTypeAnnotation()

        case 'string':
          return bt.stringTypeAnnotation()

        case 'boolean':
          return bt.booleanTypeAnnotation()

        case 'true':
          return bt.booleanLiteral(true)

        default:
          return bt.genericTypeAnnotation(bt.identifier(type.name))
      }
    }

    return bt.genericTypeAnnotation(
      bt.identifier(this.store.get(typeName).build())
    )
  }

  /**
   * Builds an array type.
   *
   * @param       {string}  typeName  The type name
   * @return      {string}
   */
  buildArrayType(typeName) {
    return bt.arrayTypeAnnotation(this.buildNativeType(typeName))
  }

  /**
   * Static representation of the build method
   *
   * @param      {Store}   store  The store
   * @return     {string}
   */
  static build(store) {
    return new this(store).build()
  }
}

/**
 * Gets a comment block object
 *
 * @param      {mixed}   value  The value
 * @return     {Object}
 */
const commentBlock = value => ({ type: 'CommentBlock', value })

/**
 * Repeats the defined string value
 *
 * @param      {string}  string  The string
 * @param      {number}  times   The times
 * @return     {string}
 */
const repeatString = (string, times) => {
  if (times <= 0) return ''
  if (times === 1) return string
  return string + repeatString(string, times - 1)
}

/**
 * Updates a comment
 *
 * @param      {string}  description  The description
 * @param      {number}  indent       The indent
 * @return     {Object}
 */
const smartComment = (description, indent = 0) => {
  const offset = repeatString(' ', indent)

  return commentBlock(
    `${offset}*${description.replace(/(.{1,72})\s/g, '\n * $1')}\n `
  )
}

module.exports = {
  BaseBuilder,
  commentBlock,
  smartComment,
}
