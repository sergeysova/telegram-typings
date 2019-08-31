
class TypeScalar {}
class TypeBoolean extends TypeScalar {}
class TypeNumber extends TypeScalar {}
class TypeNumberInteger extends TypeNumber {}
class TypeNumberFloat extends TypeNumber {}
class TypeString extends TypeScalar {}

class TypeEx {
	constructor(comments = []) {
		this.comments = comments;
	}
}
class TypeAny extends TypeEx {}
class TypeName extends TypeEx {
	constructor(name, ...args) {
		super(...args);
		this.name = name;
	}
}

class TypeVariants extends TypeEx {
	constructor(types, ...args) {
		super(...args);
		this.types = types;
	}
}
class TypeArray extends TypeEx {
	constructor(itemType, ...args) {
		super(...args);
		this.itemType = itemType;
	}
}

class TypeProperty {
	constructor(name, type, optional = false, description = null) {
		this.name = name;
		this.type = type;
		this.optional = optional;
		this.description = description;
	}
}
class TypeStructure extends TypeEx {
	constructor(properties, ...args) {
		super(...args);
		this.properties = properties;
	}
}

module.exports = {
	TypeScalar, TypeBoolean, TypeNumber, TypeNumberInteger, TypeNumberFloat, TypeString,
	TypeEx, TypeName, TypeVariants, TypeArray, TypeProperty, TypeStructure, TypeAny
};