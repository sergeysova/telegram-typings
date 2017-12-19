const bt = require('@babel/types')
const { default: generate } = require('@babel/generator')


const ARRAY_OF_LITERAL = 'Array of '

class BaseBuilder {
  constructor(store) {
    this.store = store
  }

  buildType(type) {
    throw new TypeError('Method should be overrided')
  }

  iterateOverTypes() {
    return [...this.store]
      .filter(type => !type.native)
      .map(type => this.buildType(type))
  }

  build() {
    const types = this.iterateOverTypes()

    return generate(bt.program(types, [], 'module'))
  }

  /**
   *
   * @param {string} typeName
   */
  buildNativeType(typeName) {
    if (typeName.indexOf(ARRAY_OF_LITERAL) === 0) {
      return this.buildArrayType(typeName.substr(ARRAY_OF_LITERAL.length))
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

    return bt.genericTypeAnnotation(bt.identifier(this.store.get(typeName).build()))
  }

  /**
   *
   * @param {string} typeName
   */
  buildArrayType(typeName) {
    return bt.arrayTypeAnnotation(this.buildNativeType(typeName))
  }

  static build(store) {
    return new this(store).build()
  }
}

function commentBlock(value) {
  return {
    type: 'CommentBlock',
    value,
  }
}

function smartComment(description) {
  const descriptionLines = description.replace(/(.{1,72}\s)\s*?/g, '\n * $1')

  return commentBlock(`*${descriptionLines}\n `)
}

module.exports = {
  BaseBuilder,
  commentBlock,
  smartComment,
}
