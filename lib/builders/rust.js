const keywords = require('rust-keywords')
const { BaseBuilder, ARRAY_OF_LITERAL } = require('./base')
/*:: const { Union, Interface, Method, Field } = require('../store')*/


// const hasLifetime = (typeName) => !(['i64', 'bool', 'f64'].includes(typeName))

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

  buildReference(type/*: any*/)/*: any*/ {
    return `Box<${String(type)}>`
  }

  buildArrayOfType(type/*: string*/) {
    return `Vec<${this.buildNativeType(type.substr(ARRAY_OF_LITERAL.length))}>`
  }

  buildInterface(object/*: Interface*/) {
    const fields = Object.keys(object.fields)
      .map((fieldName) => this.buildField(object.fields[fieldName]))
    // Disabled because not used now, but can be used in future
    // const hasLifetimeIn = fields.some((def) => def.indexOf('\'a') !== -1)
    const lifetime = '' // !hasLifetimeIn ? '<\'a> ' : ''

    return `${this.buildComments(object.description || '', object.links).split('\n').map((e) => e.trim()).join('\n')}
#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct ${object.name}${lifetime} {
  ${fields.join('\n\n  ')}
}`
  }

  // TODO: Build method types distinctly from interface types
  buildMethod(object/*: Method*/) {
    const fields = Object.keys(object.fields)
      .map((fieldName) => this.buildField(object.fields[fieldName]))
    // Disabled because not used now, but can be used in future
    // const hasLifetimeIn = fields.some((def) => def.indexOf('\'a') !== -1)
    const lifetime = '' // !hasLifetimeIn ? '<\'a> ' : ''

    return `${this.buildComments(object.description || '', object.links).split('\n').map((e) => e.trim()).join('\n')}
#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct ${object.name}${lifetime} {
  ${fields.join('\n\n  ')}
}`
  }

  buildUnion(object/*: Union*/) {
    return `${this.buildComments(object.description || '', object.links).split('\n').map((e) => e.trim()).join('\n')}
#[derive(Serialize, Deserialize, Debug, Clone)]
pub enum ${object.name} {
  ${object.variants.map((vari) => `${vari}(Box<${vari}>)`).join(',\n  ')}
}`
  }

  buildUnionOfTypes(types/*: Array<string>*/) {
    // FIXME: Represent disjoint union type correctly for Rust
    return types.join('Or')
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
    const lifetime = '' // hasLifetime(this.buildNativeType(object.type)) ? '&\'a ' : ''

    return rename
      ? `${comments}\n  ${rename}\n  pub ${name}: ${lifetime}${type},`
      : `${comments}\n  pub ${name}: ${lifetime}${type},`
  }

  buildModule(types/*: string[]*/) {
    return types.join('\n\n')
  }

  buildProgram(body/*: any*/) {
    return {
      code: `#[macro_use]
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
