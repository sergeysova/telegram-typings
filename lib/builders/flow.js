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

  buildNativeType(typeName) {
    switch (typeName.toLowerCase()) {
      case 'integer':
      case 'float':
        return bt.numberTypeAnnotation()

      case 'string':
        return bt.stringTypeAnnotation()

      case 'boolean':
        return bt.booleanTypeAnnotation()

      case 'true':
        return bt.booleanLiteral(true)

      default:
        return this.buildStoreNativeType(typeName)
    }
  }

  buildStoreNativeType(typeName) {
    if (!this.store.has(typeName)) {
      throw new TypeError(`${typeName} not found in store`)
    }

    return bt.genericTypeAnnotation(bt.identifier(this.store.get(typeName).build()))
  }
}

module.exports = {
  FlowBuilder,
}

