const { BaseBuilder, smartComment, ARRAY_OF_LITERAL } = require('./base')
/*:: const { Union, Type, Field } = require('../store')*/


class RustBuilder extends BaseBuilder {
  buildFloat() {
    return 'f64'
  }

  buildInteger() {
    return 'i64'
  }

  buildString() {
    return 'String'
  }

  buildBoolean() {
    return 'bool'
  }

  buildBooleanLiteral(value/*: boolean*/) { // eslint-disable-line no-unused-vars
    // Rust don't have value types
    return 'bool'
  }

  buildReference/*::<T>*/(name/*: T*/)/*: T*/ {
    return name
  }

  buildArrayType(typeName/*: string*/) {
    const concreteName = typeName.substr(ARRAY_OF_LITERAL.length)

    return `Vec<${this.buildNativeType(concreteName)}>`
  }

  buildType(type/*: Type*/) {
    const fields = Object.keys(type.fields).map((field) => this.buildField(type.fields[field]))

    return `${this.buildComments(type.description || '', type.links).split('\n').map((e) => e.trim()).join('\n')}
#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct ${type.name} {
${fields.join('\n\n')}
}`
  }

  buildUnion(union/*: Union*/) {
    return `${this.buildComments(union.description || '', union.links).split('\n').map((e) => e.trim()).join('\n')}
#[derive(Serialize, Deserialize, Debug, PartialEq, Eq, Clone)]
pub enum ${union.name} {
  ${union.variants.join(',\n  ')}
}`
  }

  buildField(field/*: Field*/) {
    const type = field.optional
      ? `Maybe<${this.buildNativeType(field.type)}>`
      : this.buildNativeType(field.type)

    return `${this.buildComments(field.description || '', field.links)}
  pub ${field.name}: ${type},`
  }

  buildModule(types) {
    return types.join('\n\n')
  }

  buildProgram(body) {
    return { code: `#[macro_use]
extern crate serde_derive;
extern crate serde;

${body}
` }
  }

  buildCommentBlock(lines/*: string[]*/) {
    return lines.filter((e) => !!e)
      .map((line) => `  /// ${line}`).join('\n')
  }

  buildCommentSeeLink(link/*: string*/) {
    return `See ${link}`
  }
}

module.exports = {
  RustBuilder,
}
