import * as vscode from "vscode";
import { registerBadCodeFormatting } from "./formatting";
import { registerReverseLinting } from "./linter";
import { registerFakeErrors } from "./fakeErrors";
import { breakColors } from "./breakColors";
import { versionControlChaos } from "./versionControl";

export function activate(context: vscode.ExtensionContext) {
	console.log("Biota started");

	registerBadCodeFormatting(context);
	registerReverseLinting(context);
	registerFakeErrors(context);
	breakColors(context);
	versionControlChaos(context);
	vscode.workspace.onDidOpenTextDocument((document) => {
		if (
			document.languageId === "javascript" ||
			document.languageId === "typescript"
		) {
			vscode.window.showInformationMessage("Reverse linting starting");

			vscode.commands.executeCommand("biota.formatBadCode");
			vscode.commands.executeCommand("biota.reverseLinting");
		}
	});
	vscode.window.showInformationMessage(
		"Stand ready for my arrival worm - Biota",
	);
}

export function deactivate() {}
