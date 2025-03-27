import * as vscode from "vscode";
import rules from "./rules";
// STATUS: DONE

export function registerReverseLinting(context: vscode.ExtensionContext) {
	const diagnosticCollection =
		vscode.languages.createDiagnosticCollection("Reverse Linter");
	context.subscriptions.push(diagnosticCollection);

	function lintDocument(document: vscode.TextDocument) {
		if (
			![
				"javascript",
				"typescript",
				"javascriptreact",
				"typescriptreact",
			].includes(document.languageId)
		) {
			return;
		}
		const diagnostics: vscode.Diagnostic[] = [];

		for (let line = 0; line < document.lineCount; line++) {
			const textLine = document.lineAt(line);
			// biome-ignore lint/complexity/noForEach: <explanation>
			rules.forEach((rule) => {
				const regex = new RegExp(rule.regex.source, rule.regex.flags);
				let match: RegExpExecArray | null = regex.exec(textLine.text);

				while (match) {
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
					diagnostic.source = "Biota Reverse Linter";
					diagnostics.push(diagnostic);
					match = regex.exec(textLine.text);
				}
			});
		}

		diagnostics.forEach((diag, index) => {
			diag.severity =
				index % 2 === 0 // just base it upon even or odd for now , TODO: Add manual severity
					? vscode.DiagnosticSeverity.Error
					: vscode.DiagnosticSeverity.Warning;
		});
		diagnosticCollection.set(document.uri, diagnostics);

		if (diagnostics.length > 0) {
			vscode.window.showWarningMessage(
				`Biota - Your code in ${document.fileName} is way too clean`,
			);
		} else {
			vscode.window.showInformationMessage("Biota - Congrats on absolute slop");
			diagnosticCollection.delete(document.uri);
		}
	}

	// JIC Manual linting is needed
	context.subscriptions.push(
		vscode.commands.registerCommand("biota.lintCode", () => {
			const editor = vscode.window.activeTextEditor;
			if (!editor) {
				vscode.window.showErrorMessage("No active editor found.");
				return;
			}
			lintDocument(editor.document);
		}),
	);

	// lint on save
	context.subscriptions.push(
		vscode.workspace.onDidSaveTextDocument((document) => {
			lintDocument(document);
		}),
	);

	// lint on open
	context.subscriptions.push(
		vscode.workspace.onDidOpenTextDocument((document) => {
			lintDocument(document);
		}),
	);

	// lint on change
	context.subscriptions.push(
		vscode.window.onDidChangeActiveTextEditor((editor) => {
			if (editor?.document) {
				lintDocument(editor.document);
			}
		}),
	);

	if (vscode.window.activeTextEditor) {
		lintDocument(vscode.window.activeTextEditor.document);
	}
}
