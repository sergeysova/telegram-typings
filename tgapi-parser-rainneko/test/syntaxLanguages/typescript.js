const ts = require("typescript")

module.exports = (fileNames) => {
	const program = ts.createProgram(fileNames, {});
	const emitResult = program.emit();
	const allDiagnostics = ts
		.getPreEmitDiagnostics(program)
		.concat(emitResult.diagnostics);
	
	return allDiagnostics.map(diagnostic => {
		if ( diagnostic.file ) {
			const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
			const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
			return `${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`;
		} else {
			return `${ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n")}`;
		}
	});
}