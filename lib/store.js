/* eslint-disable class-methods-use-this */

/* :: type Attributes = {
  description?: string,
  links?: string[],
  native?: boolean,
  nameOverride?: string,
} */

/**
 * Item save only name, description, links, native flag
 */
class Item {
  /*:: name: string*/
  /*:: nameOverride: string*/
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
    this.native = native
  }

  build() {
    return this.nameOverride || this.name
  }
}

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

/**
 * Type is a some type and can be saved in Store
 */
class Type extends Item { }

/*:: type FieldMap = { [name: string]: Field }*/
/**
 * Type is a interface/type object definition
 */
class Interface extends Type {
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
class Union extends Type {
  /*:: variants: string[]*/

  constructor(name/*: string*/, attributes/*: Attributes*/, variants/*: string[]*/ = []) {
    super(name, attributes)
    if (attributes.nameOverride) {
      this.nameOverride = attributes.nameOverride
    }

    this.variants = variants
  }
}

/**
 * Store saves Types
 */
class Store {
  /*:: types: Map<string, Type>*/

  constructor() {
    this.types = new Map()
  }

  add(target/*: Type*/) {
    this.types.set(target.name, target)
  }

  get(targetName/*: string*/)/*: ?Type*/ {
    return this.types.get(targetName)
  }

  has(targetName/*: string*/)/*: boolean*/ {
    return this.types.has(targetName)
  }

  * iterate()/*: Iterable<Type>*/ {
    yield* this.types.values()
  }

  serialize() {
    return [...this.types.values()]
      .reduce((acc, type) => {
        if (type instanceof Interface) {
          acc.types[type.name] = type
        }
        else if (type instanceof Union) {
          acc.unions[type.name] = type
        }

        return acc
      }, { types: {}, unions: {} })
  }
}

module.exports = {
  Interface,
  Union,
  Field,
  Store,
}
