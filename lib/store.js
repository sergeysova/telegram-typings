/* eslint-disable class-methods-use-this */

/* :: type Attributes = {
  description?: string,
  links?: string[],
  native?: boolean,
} */

class Item {
  /*:: name: string*/
  /*:: description: ?string*/
  /*:: links: string[]*/
  /*:: native: boolean*/

  constructor(
    name/*: string*/,
    { description, links = [], native = false }/*: Attributes*/
  ) {
    this.name = name
    this.description = description
    this.links = links
    this.fields = fields
    this.native = native
  }

  build() {
    return this.name
  }
}

/**
 * Model can be saved in Store
 * Item only save name, description, links, native flag
 */
class Model extends Item {}

/*:: type FieldAttributes = { ...Attributes, optional: boolean }*/
/**
 * Field represent field of object/interface
 */
class Field extends Item {
  /*:: type: string*/
  /*:: optional: boolean*/

  constructor(
    name/*: string*/,
    type/*: string*/,
    attributes/*: FieldAttributes*/ = { optional: false }
  ) {
    super(name, attributes)

    this.type = type
    this.optional = attributes.optional
  }
}

/*:: type FieldMap = { [name: string]: Field }*/
/**
 * Type is a interface/type object definition
 */
class Type extends Model {
  /*:: fields: FieldMap*/

  constructor(name/*: string*/, attributes/*: Attributes*/, fields/*: FieldMap*/ = {}) {
    super(name, attributes)

    this.fields = fields
  }
}

/**
 * Union is a one of types
 * @example
 * type Foo = A | B | C
 */
class Union extends Model {
  /*:: variants: string[]*/

  constructor(name/*: string*/, attributes/*: Attributes*/, variants/*: string[]*/ = []) {
    super(name, attributes)

    this.variants = variants
  }
}

/**
 * Store saves Models
 */
class Store {
  /*:: types: Map<string, Model>*/

  constructor() {
    this.types = new Map()
  }

  add(target/*: Model*/) {
    this.types.set(target.name, target)
  }

  get(targetName/*: string*/)/*: ?Model*/ {
    return this.types.get(targetName)
  }

  has(targetName/*: string*/)/*: boolean*/ {
    return this.types.has(targetName)
  }

  * models()/*: Iterable<Model>*/ {
    yield* this.types.values()
  }

  serialize() {
    return [...this.types.values()]
      .reduce((acc, type) => {
        if (type instanceof Type) {
          acc.types[type.name] = type
        }
        else if (type instanceof Union) {
          acc.unions[type.name] = type
        }

        return acc
      }, { types: {}, unions: {}})
  }
}

module.exports = {
  Type,
  Union,
  Field,
  Store,
}
