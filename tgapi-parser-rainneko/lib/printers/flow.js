
const TSPrinter = require("./typescript.js")

class FlowPrinter extends TSPrinter {
	printer(types) {
		this.code = "";
		this.space = 0;

		this.space++;
		this.addCode(`declare module "${this.options.module}" {\n`);
		[...types].forEach(([name, type]) => {
			this.addComments(type.comments||[]);
			this.addCode(`declare type ${name} = `);
			this.printType(type);
			this.addCode(`\n`);
		});
		this.space--;
		this.addCode(`\n}\n`);
		return this.code;
	}
}

module.exports = FlowPrinter;
