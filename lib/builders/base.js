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
      const arrayType = this.buildArrayType(typeName.substr(ARRAY_OF_LITERAL.length))

      return arrayType
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

function splitByLines(value) {
  const output = []
  const len = 70
  let curr = len
  let prev = 0

  while (value[curr]) {
    if (value[curr++] === ' ') {
      output.push(` * ${value.substring(prev, curr)}`)
      prev = curr
      curr += len
    }
  }

  output.push(` * ${value.substr(prev)}`)

  return output.join('\n')
}

function smartComment(description, indent = 0) {
  return commentBlock(`*\n${splitByLines(description)}\n `)
}

module.exports = {
  BaseBuilder,
  commentBlock,
  smartComment,
}
