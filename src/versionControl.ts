import * as vscode from "vscode";
import { exec } from "node:child_process";
import * as path from "node:path";
import * as fs from "node:fs";
// STATUS: DONE
export function versionControlChaos(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand("biota.breakGit", async () => {
			const folders = vscode.workspace.workspaceFolders;
			if (!folders || folders.length === 0) {
				vscode.window.showErrorMessage(
					"Git does not exist. Open a folder first.",
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

						const selectedFiles = files.filter(() => Math.random() > 0.1);
						if (selectedFiles.length === 0) {
							vscode.window.showInformationMessage("You are safe today!");
							return;
						}

						let movesPerformed = 0;

						// biome-ignore lint/complexity/noForEach: <explanation>
						selectedFiles.forEach((file) => {
							const originalPath = path.join(gitRoot, file);
							const dir = path.dirname(originalPath);
							const ogName = path.basename(originalPath);
							// ready files for production lol
							const newName = `prod.${Math.floor(Math.random() * 1000)}${ogName}`;
							const tempPath = path.join(dir, newName);
							try {
								fs.renameSync(originalPath, tempPath);
								movesPerformed++;
							} catch (e) {}
						});

						exec("git add .", { cwd: gitRoot }, (err) => {
							if (err) {
								vscode.window.showErrorMessage(
									"Failed to stage files for commit.",
								);
								return;
							}

							const commitMessage = `Important issue  #${Math.random()
								.toString(36)
								.substring(2, 8)}`;
							exec(
								`git commit -m "${commitMessage}"`,
								{ cwd: gitRoot },
								(err) => {
									if (err) {
										vscode.window.showErrorMessage(
											"Failed to commit changes to Git.",
										);
										return;
									}

									// Shuffle and reorder files in staging
									const shuffledFiles = selectedFiles.sort(
										() => Math.random() - 0.5,
									);
									const addCommand = `git add ${shuffledFiles.join(" ")}`;
									exec(addCommand, { cwd: gitRoot }, (err) => {
										if (err) {
											vscode.window.showErrorMessage(
												"Failed to stage files for commit.",
											);
											return;
										}
										vscode.window.showInformationMessage("Done!");
									});
								},
							);
						});
					});
				},
			);
		}),
	);
}
