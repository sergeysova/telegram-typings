const keywords = require('rust-keywords')
const { BaseBuilder, ARRAY_OF_LITERAL } = require('./base')
/*:: const { Union, Interface, Field } = require('../store')*/


// const hasLifetime = (type) => !(['i64', 'bool', 'f64'].includes(type))

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

  buildReference/*::<T>*/(type/*: T*/)/*: T*/ {
    return `Box<${type}>`
  }

  buildArrayOfType(type/*: string*/) {
    return `Vec<${this.buildNativeType(type.substr(ARRAY_OF_LITERAL.length))}>`
  }

  buildInterface(object/*: Interface*/) {
    const fields = Object.values(object.fields).map((field) => this.buildField(field))
    const hasLifetimeIn = fields.some((def) => def.indexOf('\'a') !== -1)
    const lifetime = !hasLifetimeIn ? '<\'a> ' : ''

    return `${this.buildComments(object.description || '', object.links).split('\n').map((e) => e.trim()).join('\n')}
#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct ${object.name}${lifetime} {
  ${fields.join('\n\n  ')}
}`
  }

  buildUnion(object/*: Union*/) {
    return `${this.buildComments(object.description || '', object.links).split('\n').map((e) => e.trim()).join('\n')}
#[derive(Serialize, Deserialize, Debug, PartialEq, Eq, Clone)]
pub enum ${object.name} {
  ${object.variants/*.map((vari) => `${vari}(Box<${vari}>)`)*/.join(',\n  ')}
}`
  }

  buildField(object/*: Field*/) {
    const type = object.optional
      ? `Option<${this.buildNativeType(object.type)}>`
      : this.buildNativeType(object.type)
    const name = keywords.indexOf(object.name) !== -1
      ? `${object.name}_tl`
      : object.name
    const rename = name !== object.name
      ? `#[serde(rename = "${object.name}")]`
      : ''
    const comments = this.buildComments(object.description || '', object.links)
    // hasLifetime(this.buildNativeType(field.type))
    const lifetime = false ? '&\'a ' : ''

    return rename
      ? `${comments}\n  ${rename}\n  pub ${name}: ${lifetime}${type},`
      : `${comments}\n  pub ${name}: ${lifetime}${type},`
  }

  buildModule(types) {
    return types.join('\n\n')
  }

  buildProgram(body) {
    return {
      code: `#[maco_use]
extern crate serde_derive;
extern crate serde;

${body}
`,
    }
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
