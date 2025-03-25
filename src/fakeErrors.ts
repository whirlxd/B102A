import * as vscode from "vscode";
import { getRandomInterval } from "./getRandomInterval";

let errorTimers: NodeJS.Timeout[] = [];

export function registerFakeErrors(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand("biota.fakeErrors", () => {
			showRandomExtensionError();
		}),
	);
	showRandomExtensionError();
	// instead of using a loop which shows errors every 5-20 minutes we schedule the first error instantly then 5-10 and then 5-20

	scheduleRandomErrors();

	// cleanup
	context.subscriptions.push({
		dispose: () => {
			// biome-ignore lint/complexity/noForEach: <explanation>
			errorTimers.forEach((timer) => clearTimeout(timer));
			errorTimers = [];
		},
	});
}

function showRandomExtensionError() {
	const extensions = vscode.extensions.all;
	if (extensions.length === 0) {
		return;
	}

	const randomExtension =
		extensions[Math.floor(Math.random() * extensions.length)];
	const displayName =
		randomExtension.packageJSON.displayName || randomExtension.id;

	const errorMessages = [
		`Error: ${displayName} has encountered an issue. We recommend restarting your editor without saving your changes!`,
		`Warning: ${displayName} is causing performance issues. Consider disabling it.`,
		`Critical: ${displayName} has caused a memory leak. Save your work immediately!`,
		`${displayName} has crashed unexpectedly. Some features may not work correctly.`,
		`Extension runtime error in ${displayName}. Error code: 0x${Math.floor(
			Math.random() * 10000,
		)
			.toString(16)
			.padStart(4, "0")}`,
	];

	const randomMessage =
		errorMessages[Math.floor(Math.random() * errorMessages.length)];
	vscode.window.showErrorMessage(randomMessage);
}

function scheduleRandomErrors() {
	const firstInterval = getRandomInterval(2, 10);

	const timer = setTimeout(() => {
		showRandomExtensionError();
		scheduleNextError();
	}, firstInterval);

	errorTimers.push(timer);
}

function scheduleNextError() {
	const nextInterval = getRandomInterval(5, 20);

	const timer = setTimeout(() => {
		showRandomExtensionError();
		scheduleNextError();
	}, nextInterval);

	errorTimers.push(timer);
}
