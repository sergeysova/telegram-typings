const bt = require('@babel/types')
const { BaseBuilder, smartComment } = require('./base')


class TypeScriptBuilder extends BaseBuilder {
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

    ast.leadingComments = [smartComment(type.description || '', type.links)]
    return ast
  }

  buildField(field) {
    const ast = bt.tsPropertySignature(
      bt.identifier(field.name),
      bt.tsTypeAnnotation(bt.tsTypeReference(bt.identifier(this.buildNativeType(field.type))))
    )

    ast.optional = field.optional
    ast.leadingComments = [smartComment(field.description || '')]
    return ast
  }
}

module.exports = {
  TypeScriptBuilder,
}

