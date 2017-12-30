const bt = require('@babel/types')
const { default: generate } = require('@babel/generator')
const { AbstractJsBuilder } = require('./abstract-js')
const { ARRAY_OF_LITERAL } = require('./base')
/*:: const { Union, Interface, Field } = require('../store')*/


class FlowBuilder extends AbstractJsBuilder {
  buildUnion(union/*: Union*/) {
    const ast = bt.declareTypeAlias(
      bt.identifier(union.name),
      undefined,
      bt.unionTypeAnnotation(union.variants.map((name) => bt.identifier(name)))
    )

    ast.leadingComments = this.buildComments(union.description || '', union.links)
    return ast
  }

  buildInterface(interf/*: Interface*/) {
    const fields = Object.keys(interf.fields).map((field) => this.buildField(interf.fields[field]))
    const ast = bt.declareTypeAlias(
      bt.identifier(interf.name),
      undefined,
      bt.objectTypeAnnotation(fields),
    )

    ast.leadingComments = this.buildComments(interf.description || '', interf.links)
    return ast
  }

  buildField(field/*: Field*/) {
    const ast = bt.objectTypeProperty(
      bt.identifier(field.name),
      this.buildNativeType(field.type)
    )

    ast.optional = field.optional
    ast.leadingComments = this.buildComments(field.description || '', field.links)
    return ast
  }

  buildArrayType(typeName/*: string*/) {
    return bt.arrayTypeAnnotation(this.buildNativeType(typeName.substr(ARRAY_OF_LITERAL.length)))
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

  buildReference/*::<T>*/(name/*: T*/)/*: T*/ {
    return bt.genericTypeAnnotation(bt.identifier(name))
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

