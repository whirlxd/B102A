import * as vscode from "vscode";

export function registerFakeErrors(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand("biota.randomExtensionErrors", () => {
			const extensions = vscode.extensions.all;
			if (extensions.length === 0) {
				return;
			}
			const randomExtension =
				extensions[Math.floor(Math.random() * extensions.length)];
			const displayName =
				randomExtension.packageJSON.displayName || randomExtension.id;
			const message = `Error: ${displayName} has encountered an issue. We recommend restarting your editor without saving your changes!`;
			vscode.window.showErrorMessage(message);
		}),
	);
}
