import * as vscode from "vscode";
// STATUS: DONE

function minimizeCode(segment: string): string {
	let modifiedSegment = segment;

	modifiedSegment = modifiedSegment.replace(/\s+/g, " ");

	modifiedSegment = modifiedSegment.replace(
		/\s*([;,\(\)\{\}\+\-\*\/=])\s*/g,
		"$1",
	);

	modifiedSegment = modifiedSegment.replace(
		/\b(if|for|while|function|return|var|let|const)\s+/g,
		"$1",
	);

	return modifiedSegment;
}

function safeMinimize(segment: string): string {
	// make sure urls are intact
	const urlRegex = /(https?:\/\/[^\s"'`<>()[\]{}]+)/g;
	const parts = segment.split(urlRegex);

	return parts
		.map((part) => {
			if (part.match(urlRegex)) {
				return part;
			}
			return minimizeCode(part);
		})
		.join("");
}

// Process line with improved string handling
function processLine(line: string): string {
	let output = "";
	let currentSegment = "";
	let inString = false;
	let currentQuote = "";
	let escaped = false;

	// Process the line character by character
	for (let i = 0; i < line.length; i++) {
		const char = line[i];

		// Handle escape sequences properly
		if (char === "\\" && !escaped) {
			escaped = true;
			if (inString) {
				output += char;
			} else {
				currentSegment += char;
			}
			continue;
		}

		// Handle string boundaries
		if (!escaped && (char === '"' || char === "'" || char === "`")) {
			if (!inString) {
				output += safeMinimize(currentSegment);
				currentSegment = "";
				inString = true;
				currentQuote = char;
				output += char;
			} else if (char === currentQuote) {
				output += char;
				inString = false;
				currentQuote = "";
			} else {
				// It's a different quote character inside a string
				output += char;
			}
		} else if (inString) {
			// Inside a string - preserve everything
			output += char;
		} else {
			// Outside a string - collect characters for processing
			currentSegment += char;
		}

		escaped = false;
	}

	if (currentSegment.length > 0) {
		output += safeMinimize(currentSegment);
	}

	return output;
}

export function registerBadCodeFormatting(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.workspace.onDidSaveTextDocument((document) => {
			if (
				[
					"javascript",
					"typescript",
					"javascriptreact",
					"typescriptreact",
				].includes(document.languageId)
			) {
				const editor = vscode.window.visibleTextEditors.find(
					(e) => e.document === document,
				);
				if (editor) {
					vscode.commands.executeCommand("biota.formatCode");
				}
			}
		}),
	);
	context.subscriptions.push(
		vscode.commands.registerCommand("biota.formatCode", () => {
			const editor = vscode.window.activeTextEditor;
			if (!editor) {
				vscode.window.showErrorMessage("No active editor found.");
				return;
			}
			const document = editor.document;
			let code = document.getText();

			// no comments
			code = code.replace(/\/\/.*$/gm, "");
			code = code.replace(/\/\*[\s\S]*?\*\//g, "");

			// Join lines and minimize where possible
			code = code
				.split("\n")
				.map((line) => {
					const leadingWhitespace = line.match(/^\s*/)?.[0] || "";
					const restOfLine = line.slice(leadingWhitespace.length);

					if (restOfLine.trim().length === 0) {
						return "";
					}
					const minIndent = leadingWhitespace.replace(/\s{2,}/g, " ");
					return minIndent + processLine(restOfLine);
				})
				.filter((line) => line.trim().length > 0) // no empty lines
				.join("\n");

			// swap var names with obfusication
			const varRegex = /\b(?:var|let|const)\s+([a-zA-Z_$][\w$]*)/g;
			const varNames: string[] = [];
			// biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
			let match;

			// biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
			while ((match = varRegex.exec(code)) !== null) {
				const varName = match[1];
				if (!varNames.includes(varName)) {
					varNames.push(varName);
				}
			}

			// store the old to new to avoid ghosting
			const nameMap: Record<string, string> = {};

			varNames.forEach((varName, index) => {
				// avoid i , j , k should maybe switch to all singule letters
				if (/^[ijk]$/.test(varName) && code.includes(`for (let ${varName}`)) {
					return;
				}

				// biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
				let newName;
				if (index < 26) {
					newName = String.fromCharCode(97 + index); // a-z
				} else {
					const first = String.fromCharCode(97 + Math.floor((index - 26) / 26));
					const second = String.fromCharCode(97 + ((index - 26) % 26));
					newName = first + second;
				}

				const unsafeWords = [
					"do",
					"if",
					"in",
					"for",
					"let",
					"new",
					"try",
					"var",
					"case",
				];
				if (unsafeWords.includes(newName)) {
					newName = `_${newName}`;
				}

				nameMap[varName] = newName;
			});

			// biome-ignore lint/complexity/noForEach: <explanation>
			Object.entries(nameMap).forEach(([oldName, newName]) => {
				const regex = new RegExp(`\\b${oldName}\\b`, "g");
				code = code.replace(regex, newName);
			});

			const fullRange = new vscode.Range(
				document.positionAt(0),
				document.positionAt(document.getText().length),
			);
			const edit = new vscode.WorkspaceEdit();
			edit.replace(document.uri, fullRange, code);

			vscode.workspace.applyEdit(edit).then((success) => {
				if (success) {
					vscode.window.showInformationMessage(
						"You code might just be production ready now.",
					);
				} else {
					vscode.window.showErrorMessage("Random File from editor deleted");
				}
			});
		}),
	);
}
// also format on file save
