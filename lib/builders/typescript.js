const bt = require('@babel/types')
const { default: generate } = require('@babel/generator')
const { AbstractJsBuilder } = require('./abstract-js')
const { ARRAY_OF_LITERAL } = require('./base')
/*:: const { Union, Field, Interface } = require('../store')*/


class TypeScriptBuilder extends AbstractJsBuilder {
  buildUnion(object/*: Union */) {
    const ast = bt.exportNamedDeclaration(
      bt.tSTypeAliasDeclaration(
        bt.identifier(object.name),
        undefined,
        bt.tSUnionType(object.variants.map((name) => (
          bt.tSTypeReference(bt.identifier(name))
        )))
      ),
      [],
    )

    ast.leadingComments = this.buildComments(object.description || '', object.links)

    return ast
  }

  buildUnionOfTypes(types/*: Array<string>*/) {
    // TODO: Build unions with AST builders, not raw strings.
    // The architecture between Flow builder and TypeScript builder differs, and we need
    // to return a `string` type instead of an AST node from this method
    return types.map((type) => this.buildNativeType(type)).join(' | ')
  }

  buildInterface(object/*: Interface*/) {
    const fields = Object.keys(object.fields)
      .map((fieldName) => this.buildField(object.fields[fieldName]))
    const ast = bt.exportNamedDeclaration(
      bt.tsInterfaceDeclaration(
        bt.identifier(object.name),
        undefined,
        null,
        bt.tsInterfaceBody(fields),
      ),
      []
    )

    ast.leadingComments = this.buildComments(object.description || '', object.links)

    return ast
  }

  buildField(object/*: Field*/) {
    const ast = bt.tsPropertySignature(
      bt.identifier(object.name),
      bt.tsTypeAnnotation(bt.tsTypeReference(bt.identifier(this.buildNativeType(object.type))))
    )

    ast.optional = object.optional
    ast.leadingComments = this.buildComments(object.description || '', object.links)

    return ast
  }

  buildArrayOfType(type/*: string*/) {
    return `${this.buildNativeType(type.substr(ARRAY_OF_LITERAL.length))}[]`
  }

  buildInteger() {
    return 'number'
  }

  buildString() {
    return 'string'
  }

  buildModule(types/*: mixed[]*/)/*: mixed[]*/ {
    return types
  }

  buildProgram(body/*: any*/) {
    return generate(bt.program(body, [], 'module'))
  }
}

module.exports = {
  TypeScriptBuilder,
}
