const {
  TypeScalar,
  TypeBoolean,
  TypeNumber,
  TypeNumberInteger,
  TypeNumberFloat,
  TypeString,
  TypeName,
  TypeVariants,
  TypeArray,
  TypeProperty,
  TypeStructure,
  TypeAny
} = require("./../abstractNodesTypes.js");

const scalarTypes = [
  [TypeNumber, "number"],
  [TypeString, "string"],
  [TypeBoolean, "boolean"]
];

class TypeScriptPrinter {
  constructor(options) {
    this.options = {
      commentLineMaxLength: 72,
      spaceText: "  ",
      ...options
    };

    this.code = "";
    this.space = 0;
  }

  addCode(code) {
    const lines = code.split(/\n/);
    this.code += lines.shift();
    lines.map(
      l =>
        (this.code +=
          "\n" + this.options.spaceText.repeat(this.space) + (l || ""))
    );
  }
  addComments(comments) {
    if (
      comments.length === 1 &&
      comments[0].text.length < this.options.commentLineMaxLength
    ) {
      this.addCode(`/** ${comments[0].text} */\n`);
      return;
    }

    const commentText = comments
      .map(c =>
        c.text.replace(
          new RegExp(
            /(.{1,99999}\s)\s*?/.source.replace(
              "99999",
              this.options.commentLineMaxLength
            ),
            "g"
          ),
          "\n* $1"
        )
      )
      .join("\n");

    this.addCode(`/**${commentText}\n*/\n`);
  }

  printType(type) {
    if (type instanceof TypeStructure) {
      this.space++;
      this.addCode(`{\n`);
      for (const prop of type.properties) {
        this.addComments(prop.description ? [prop.description] : []);
        this.addCode(`${prop.name}${prop.optional ? "?" : ""}: `);
        this.printType(prop.type);
        this.addCode(`,\n`);
      }
      this.space--;
      this.addCode(`\n}\n`);
    }

    if (type instanceof TypeArray) {
      this.addCode(`Array<`);
      this.printType(type.itemType);
      this.addCode(`>`);
    }

    if (type instanceof TypeVariants)
      type.types.map((t, i) => {
        this.printType(t);
        if (i < type.types.length - 1) this.addCode("|");
      });

    if (type instanceof TypeName) this.addCode(type.name);

    if (type instanceof TypeAny) this.addCode("any");

    for (const [cl, str] of scalarTypes)
      if (type instanceof cl) this.addCode(str);
  }

  printer(types) {
    this.code = "";
    this.space = 0;

    [...types].forEach(([name, type]) => {
      this.addComments(type.comments || []);
      this.addCode(`export type ${name} = `);
      this.printType(type);
      this.addCode(`\n`);
    });
    return this.code;
  }
}

module.exports = TypeScriptPrinter;
