const bt = require('@babel/types')
const { BaseBuilder, smartComment, ARRAY_OF_LITERAL } = require('./base')
/*:: const { Union, Field, Type } = require('../store')*/


class TypeScriptBuilder extends BaseBuilder {
  buildUnion(union/*: Union */) {
    const ast = bt.exportNamedDeclaration(
      bt.tSTypeAliasDeclaration(
        bt.identifier(union.name),
        undefined,
        bt.tSUnionType(union.variants.map((name) => (
          bt.tSTypeReference(bt.identifier(name))
        )))
      ),
      [],
    )

    ast.leadingComments = [smartComment(union.description || '', union.links)]
    return ast
  }

  buildType(type/*: Type*/) {
    const fields = Object.keys(type.fields).map((field) => this.buildField(type.fields[field]))
    const ast = bt.exportNamedDeclaration(
      bt.tsInterfaceDeclaration(
        bt.identifier(type.name),
        undefined,
        null,
        bt.tsInterfaceBody(fields),
      ),
      []
    )

    ast.leadingComments = [smartComment(type.description || '', type.links)]
    return ast
  }

  buildField(field/*: Field*/) {
    const ast = bt.tsPropertySignature(
      bt.identifier(field.name),
      bt.tsTypeAnnotation(bt.tsTypeReference(bt.identifier(this.buildNativeType(field.type))))
    )

    ast.optional = field.optional
    ast.leadingComments = [smartComment(field.description || '', field.links)]
    return ast
  }

  buildArrayType(typeName/*: string*/) {
    const tt = this.buildNativeType(typeName.substr(ARRAY_OF_LITERAL.length))

    return `${tt}[]`
  }
}

module.exports = {
  TypeScriptBuilder,
}

