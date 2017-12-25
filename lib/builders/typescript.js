const bt = require('@babel/types')
const { BaseBuilder, smartComment, ARRAY_OF_LITERAL } = require('./base')


class TypeScriptBuilder extends BaseBuilder {
  buildUnion(union) {
    const ast = bt.exportNamedDeclaration(
      bt.tSTypeAliasDeclaration(
        bt.identifier(union.name),
        undefined,
        bt.tSUnionType(union.variants.map(name => (
          bt.tSTypeReference(bt.identifier(name))
        )))
      ),
      [],
    )

    ast.leadingComments = [smartComment(union.description, union.links)]
    return ast
  }

  buildType(type) {
    const fields = [...Object.values(type.fields)].map(field => this.buildField(field))
    const ast = bt.exportNamedDeclaration(
      bt.tsInterfaceDeclaration(
        bt.identifier(type.name),
        undefined,
        null,
        bt.tsInterfaceBody(fields),
      ),
      []
    )

    ast.leadingComments = [smartComment(type.description, type.links)]
    return ast
  }

  buildField(field) {
    const ast = bt.tsPropertySignature(
      bt.identifier(field.name),
      bt.tsTypeAnnotation(bt.tsTypeReference(bt.identifier(this.buildNativeType(field.type))))
    )

    ast.optional = field.optional
    ast.leadingComments = [smartComment(field.description, field.links)]
    return ast
  }

  buildArrayType(typeName) {
    const tt = this.buildNativeType(typeName.substr(ARRAY_OF_LITERAL.length))

    return `${tt}[]`
  }
}

module.exports = {
  TypeScriptBuilder,
}

