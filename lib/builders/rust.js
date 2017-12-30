const keywords = require('rust-keywords')
const { BaseBuilder, ARRAY_OF_LITERAL } = require('./base')
/*:: const { Union, Interface, Field } = require('../store')*/


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

  buildInterface(interf/*: Interface*/) {
    const fields = Object.keys(interf.fields).map((field) => this.buildField(interf.fields[field]))

    return `${this.buildComments(interf.description || '', interf.links).split('\n').map((e) => e.trim()).join('\n')}
#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct ${interf.name} {
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
      ? `Option<${this.buildNativeType(field.type)}>`
      : this.buildNativeType(field.type)

    const name = keywords.indexOf(field.name) !== -1
      ? `${field.name}_tl`
      : field.name
    const rename = name !== field.name
      ? `#[serde(rename = "${field.name}")]`
      : ''
    const comments = this.buildComments(field.description || '', field.links)

    return rename
      ? `${comments}\n  ${rename}\n  pub ${name}: ${type},`
      : `${comments}\n  pub ${name}: ${type},`
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
