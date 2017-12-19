const bt = require('@babel/types')
const { BaseBuilder, smartComment } = require('./base')


class FlowBuilder extends BaseBuilder {
  buildType(type) {
    const fields = [...Object.values(type.fields)].map(field => this.buildField(field))
    const ast = bt.exportNamedDeclaration(
      bt.typeAlias(
        bt.identifier(type.name),
        undefined,
        bt.objectTypeAnnotation(fields),
      ),
      []
    )

    ast.leadingComments = [smartComment(type.description || '')]
    return ast
  }

  buildField(field) {
    const ast = bt.objectTypeProperty(
      bt.identifier(field.name),
      this.buildNativeType(field.type)
    )

    ast.optional = field.optional
    ast.leadingComments = [smartComment(field.description || '')]
    return ast
  }
}

module.exports = {
  FlowBuilder,
}

