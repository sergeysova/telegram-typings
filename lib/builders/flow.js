const bt = require('@babel/types')
const { default: generate } = require('@babel/generator')
const { AbstractJsBuilder } = require('./abstract-js')
const { ARRAY_OF_LITERAL } = require('./base')
/*:: const { Union, Interface, Field } = require('../store')*/


class FlowBuilder extends AbstractJsBuilder {
  buildUnion(object/*: Union*/) {
    const ast = bt.declareTypeAlias(
      bt.identifier(object.name),
      undefined,
      bt.unionTypeAnnotation(object.variants.map((name) => bt.identifier(name)))
    )

    ast.leadingComments = this.buildComments(object.description || '', object.links)
    return ast
  }

  buildInterface(object/*: Interface*/) {
    const fields = Object.values(object.fields).map((field) => this.buildField(field))
    const ast = bt.declareTypeAlias(
      bt.identifier(object.name),
      undefined,
      bt.objectTypeAnnotation(fields),
    )

    ast.leadingComments = this.buildComments(object.description || '', object.links)

    return ast
  }

  buildField(object/*: Field*/) {
    const ast = bt.objectTypeProperty(
      bt.identifier(object.name),
      this.buildNativeType(object.type)
    )

    ast.optional = object.optional
    ast.leadingComments = this.buildComments(object.description || '', object.links)

    return ast
  }

  buildArrayOfType(type/*: string*/) {
    return bt.arrayTypeAnnotation(this.buildNativeType(type.substr(ARRAY_OF_LITERAL.length)))
  }

  buildInteger() {
    return bt.numberTypeAnnotation()
  }

  buildString() {
    return bt.stringTypeAnnotation()
  }

  buildBoolean() {
    return bt.booleanTypeAnnotation()
  }

  buildBooleanLiteral(value/*: boolean*/) {
    return bt.booleanLiteral(value)
  }

  buildReference/*::<T>*/(type/*: T*/)/*: T*/ {
    return bt.genericTypeAnnotation(bt.identifier(type))
  }

  buildModule(types/*: mixed[]*/)/*: mixed[]*/ {
    return [bt.declareModule(bt.stringLiteral('telegram-typings'), bt.blockStatement(types))]
  }

  buildProgram(body) {
    return generate(bt.program(body, [], 'module'))
  }
}

module.exports = {
  FlowBuilder,
}
