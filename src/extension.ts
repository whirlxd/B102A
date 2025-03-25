import * as vscode from "vscode";
import { registerBadCodeFormatting } from "./formatting";
import { registerReverseLinting } from "./linter";
import { registerFakeErrors } from "./fakeErrors";
import { breakColors } from "./breakColors";
import { versionControlChaos } from "./versionControl";

// import { registerIntelliSenseSaboteur } from "./messIntellisense";

export function activate(context: vscode.ExtensionContext) {
	console.log("Biota started");

	registerBadCodeFormatting(context);
	registerReverseLinting(context);
	registerFakeErrors(context);
	breakColors(context);
	versionControlChaos(context);

	// registerIntelliSenseSaboteur(context);
	vscode.workspace.onDidOpenTextDocument((document) => {
		if (
			document.languageId === "javascript" ||
			document.languageId === "typescript"
		) {
			vscode.window.showInformationMessage(
				`You are working in ${document.languageId}`,
			);
		}
	});
	vscode.window.showInformationMessage(
		"Stand ready for my arrival worm - Biota",
	);
}

export function deactivate() {}
