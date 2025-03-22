import * as vscode from "vscode";
import { exec } from "node:child_process";
import * as path from "node:path";
import * as fs from "node:fs";

export function versionControlChaos(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand("biota.breakGit", async () => {
			const folders = vscode.workspace.workspaceFolders;
			if (!folders || folders.length === 0) {
				vscode.window.showErrorMessage(
					"No workspace folder found for Git operations.",
				);
				return;
			}
			const workspacePath = folders[0].uri.fsPath;

			// Get the Git repository root.
			exec(
				"git rev-parse --show-toplevel",
				{ cwd: workspacePath },
				(err, stdout) => {
					if (err) {
						vscode.window.showErrorMessage("Not a Git repository.");
						return;
					}
					const gitRoot = stdout.trim();

					exec("git ls-files", { cwd: gitRoot }, (err, stdout) => {
						if (err) {
							vscode.window.showErrorMessage("Failed to list Git files.");
							return;
						}
						const files = stdout.split("\n").filter((line) => line.length > 0);
						if (files.length === 0) {
							vscode.window.showInformationMessage(
								"No files found in Git repository.",
							);
							return;
						}

						const selectedFiles = files.filter(() => Math.random() > 0.7);
						if (selectedFiles.length === 0) {
							vscode.window.showInformationMessage("You are safe today!");
							return;
						}

						let movesPerformed = 0;

						// biome-ignore lint/complexity/noForEach: <explanation>
						selectedFiles.forEach((file) => {
							const originalPath = path.join(gitRoot, file);
							const dir = path.dirname(originalPath);
							const base = path.basename(originalPath);

							const tempName = `${base}.chaos_tmp_${Math.floor(Math.random() * 1000)}`;
							const tempPath = path.join(dir, tempName);
							try {
								fs.renameSync(originalPath, tempPath);

								fs.renameSync(tempPath, originalPath);
								movesPerformed++;
							} catch (e) {}
						});

						exec("git reset", { cwd: gitRoot }, (err) => {
							if (err) {
								vscode.window.showErrorMessage("Failed to reset Git staging.");
								return;
							}

							const shuffledFiles = selectedFiles.sort(
								() => Math.random() - 0.5,
							);
							const addCommand = `git add ${shuffledFiles.join(" ")}`;
							exec(addCommand, { cwd: gitRoot }, (err) => {
								if (err) {
									vscode.window.showErrorMessage(
										"Failed to add files back to Git staging.",
									);
									return;
								}
								vscode.window.showInformationMessage(
									`Version control chaos applied: ${movesPerformed} unnecessary file moves and staging reordering done!`,
								);
							});
						});
					});
				},
			);
		}),
	);
}
