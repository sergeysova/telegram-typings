const Config = require("../config.js")
const TSCheckSyntax = require("./syntaxLanguages/typescript.js")

const checkSynaxMap = {
	typescript: TSCheckSyntax
};

const hasError = Config
	.filter(options => typeof options.checkSyntax === "string")
	.map(options => {
		console.log(`Check syntax for '${options.lang}'...`);
		return checkSynaxMap[options.checkSyntax]([options.path])
			.map(error => console.log( `\x1b[31m${error}\x1b[0m` ));
	})
	.some(errors => errors.length);

if ( hasError )
	process.exit(1);