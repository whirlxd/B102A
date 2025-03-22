import * as vscode from "vscode";
export function breakColors(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand("biota.breakColors", () => {
			const editor = vscode.window.activeTextEditor;
			if (!editor) {
				return;
			}
			// highest compatibility with javascript after testing
			const modes = ["python", "rust", "go"];
			const randomMode = modes[Math.floor(Math.random() * modes.length)];
			vscode.languages
				.setTextDocumentLanguage(editor.document, randomMode)
				.then(() => {
					vscode.window.showInformationMessage(
						"Syntax highlighting changed to a superior language jstard",
					);
				});
		}),
	);
}
