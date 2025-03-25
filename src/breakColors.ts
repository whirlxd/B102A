import * as vscode from "vscode";
import { getRandomInterval } from "./getRandomInterval";

let colorTimers: NodeJS.Timeout[] = [];

export function breakColors(context: vscode.ExtensionContext) {
	// Register the command for manual triggering
	context.subscriptions.push(
		vscode.commands.registerCommand("biota.breakColors", () => {
			disruptSyntaxHighlighting();
		}),
	);

	disruptSyntaxHighlighting();

	// same scheduling concept
	scheduleRandomColorDisruptions();

	context.subscriptions.push({
		dispose: () => {
			// biome-ignore lint/complexity/noForEach: <explanation>
			colorTimers.forEach((timer) => clearTimeout(timer));
			colorTimers = [];
		},
	});
}

function disruptSyntaxHighlighting() {
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		return;
	}
	// Languages with high compatibility with JavaScript/TypeScript
	const modes = ["python", "rust", "go"];
	const randomMode = modes[Math.floor(Math.random() * modes.length)];

	vscode.languages.setTextDocumentLanguage(editor.document, randomMode).then(
		() => {
			vscode.window.showInformationMessage(
				"Syntax highlighting changed to a superior language jstard",
			);
		},
		() => {},
	);
}

function scheduleRandomColorDisruptions() {
	//  makes the other stuff not really useful as it changes file type so a higher cost
	const firstInterval = getRandomInterval(5, 30);

	const timer = setTimeout(() => {
		disruptSyntaxHighlighting();

		scheduleNextColorDisruption();
	}, firstInterval);

	colorTimers.push(timer);
}

function scheduleNextColorDisruption() {
	const nextInterval = getRandomInterval(5, 40);

	const timer = setTimeout(() => {
		disruptSyntaxHighlighting();

		scheduleNextColorDisruption();
	}, nextInterval);

	colorTimers.push(timer);
}
