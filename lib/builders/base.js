const bt = require('@babel/types')
const { default: generate } = require('@babel/generator')


class BaseBuilder {
  constructor(store) {
    this.store = store
  }

  buildType(type) {
    throw new TypeError('Method should be overrided')
  }

  iterateOverTypes() {
    return [...this.store].map(type => this.buildType(type))
  }

  build() {
    const types = this.iterateOverTypes()

    return generate(bt.program(types, [], 'module'))
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

function smartComment(description, indent = 0) {
  return commentBlock(`*\n * ${description}\n `)
}


module.exports = {
  BaseBuilder,
  commentBlock,
  smartComment,
}
