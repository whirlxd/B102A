import * as vscode from "vscode";
import rules from "./rules";
export function registerReverseLinting(context: vscode.ExtensionContext) {
	const diagnosticCollection =
		vscode.languages.createDiagnosticCollection("Reverse Linter");
	context.subscriptions.push(diagnosticCollection);

	context.subscriptions.push(
		vscode.commands.registerCommand("biota.reverseLinting", () => {
			const editor = vscode.window.activeTextEditor;
			if (!editor) {
				vscode.window.showErrorMessage("No active editor found.");
				return;
			}
			const document = editor.document;
			const diagnostics: vscode.Diagnostic[] = [];

			for (let line = 0; line < document.lineCount; line++) {
				const textLine = document.lineAt(line);
				// biome-ignore lint/complexity/noForEach: <explanation>
				rules.forEach((rule) => {
					const regex = new RegExp(rule.regex.source, rule.regex.flags);
					let match: RegExpExecArray | null;
					// biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
					while ((match = regex.exec(textLine.text))) {
						const startPos = new vscode.Position(line, match.index);
						const endPos = new vscode.Position(
							line,
							match.index + match[0].length,
						);
						const range = new vscode.Range(startPos, endPos);
						const diagnostic = new vscode.Diagnostic(
							range,
							rule.message,
							vscode.DiagnosticSeverity.Warning,
						);
						diagnostic.source = "Reverse Linter";
						diagnostics.push(diagnostic);
					}
				});
			}

			// mixture of warnings and errors since warning can be ignored when building and debugging
			diagnostics.forEach((diagnostic, index) => {
				diagnostic.severity =
					index % 2 === 0
						? vscode.DiagnosticSeverity.Error
						: vscode.DiagnosticSeverity.Warning;
			});
			diagnosticCollection.set(document.uri, diagnostics);

			if (diagnostics.length > 0) {
				vscode.window.showWarningMessage("Biota - Your code is way too clean");
			} else {
				vscode.window.showInformationMessage(
					"Biota - Congrats on absolute slop",
				);
				diagnosticCollection.delete(document.uri);
			}
		}),
	);
}
