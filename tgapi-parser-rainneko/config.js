
const path = require("path")

const PATH_TS = path.join(__dirname, "../", "javascript", "index.d.ts");
const PATH_FLOW = path.join(__dirname, "../", "javascript", "index.js.flow");

module.exports = [
	{
		lang: "typescript",
		path: PATH_TS,
		printer: {
			lang: "typescript",
			options: {}
		},
		checkSyntax: "typescript",
	},
	{
		lang: "flow",
		path: PATH_FLOW,
		printer: "flow",
		printer: {
			lang: "flow",
			options: {
				module: "telegram-typings"
			}
		},
		//checkSyntax: "typescript",
	}
];