import * as vscode from "vscode";

function injectWhitespace(segment: string): string {
	return segment.replace(
		/([A-Za-z0-9_$])([;,\(\)\{\}\+\-\*\/=])/g,
		(match, p1, p2) => {
			const extra = (Math.random() > 0.5 ? "\t" : " ").repeat(
				Math.floor(Math.random() * 2) + 1,
			);
			return `${p1}${extra}${p2}`;
		},
	);
}
//  Some copilot bullshit to keep urls and strings but its not working
// Helper to process a segment but leave any URLs intact.
function safeInject(segment: string): string {
	// Regex to match URLs (http:// or https:// followed by non-whitespace)
	const urlRegex = /(https?:\/\/\S+)/g;
	// Split the segment by URL parts and inject whitespace only into non-URL parts.
	const parts = segment.split(urlRegex);
	return parts
		.map((part) => {
			// If this part is a URL, skip formatting.
			if (/^https?:\/\/\S+$/.test(part)) {
				return part;
			}
			return injectWhitespace(part);
		})
		.join("");
}
// same bullshit below
// Process a single line to preserve string literals and URLs unchanged.
function processLine(line: string): string {
	let output = "";
	let currentSegment = "";
	let inString = false;
	let currentQuote = "";

	for (let i = 0; i < line.length; i++) {
		const char = line[i];

		// Start of a string literal.
		if (!inString && (char === '"' || char === "'" || char === "`")) {
			// Process and flush the segment outside the string.
			output += safeInject(currentSegment);
			currentSegment = "";
			inString = true;
			currentQuote = char;
			output += char;
		}
		// Inside a string literal.
		else if (inString) {
			output += char;
			// End string literal when encountering the matching quote (ignoring escaped quotes).
			if (char === currentQuote && line[i - 1] !== "\\") {
				inString = false;
				currentQuote = "";
			}
		}
		// Outside any string literal.
		else {
			currentSegment += char;
		}
	}
	// Flush any remaining text outside of string literals.
	if (currentSegment.length > 0) {
		output += safeInject(currentSegment);
	}
	return output;
}

export function registerBadCodeFormatting(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand("biota.formatCode", () => {
			const editor = vscode.window.activeTextEditor;
			if (!editor) {
				vscode.window.showErrorMessage("No active editor found.");
				return;
			}
			const document = editor.document;
			let code = document.getText();

			//  no comments allowed if they get past linter
			code = code.replace(/\/\/.*$/gm, "");
			code = code.replace(/\/\*[\s\S]*?\*\//g, "");

			code = code
				.split("\n")
				.map((line) => {
					const leadingWhitespace = line.match(/^\s*/)?.[0] || "";
					const restOfLine = line.slice(leadingWhitespace.length);
					return (
						leadingWhitespace +
						processLine(restOfLine) +
						(Math.random() > 0.7 ? (Math.random() > 0.5 ? "\t" : " ") : "")
					);
				})
				.join("\n");

			// my favorite part, obfuscating variable names to make it harder to read
			const varRegex = /\b(?:var|let|const)\s+([a-zA-Z_$][\w$]*)/g;
			const varNames: string[] = [];
			// biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
			let match;
			// biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
			while ((match = varRegex.exec(code)) !== null) {
				if (!varNames.includes(match[1])) {
					varNames.push(match[1]);
				}
			}
			// only 20% of the time
			// biome-ignore lint/complexity/noForEach: <explanation>
			varNames.forEach((varName) => {
				if (Math.random() > 0.8) {
					const newName = `_${Math.random().toString(36).substring(2, 8)}`;
					const regex = new RegExp(`\\b${varName}\\b`, "g");
					code = code.replace(regex, newName);
				}
			});

			const fullRange = new vscode.Range(
				document.positionAt(0),
				document.positionAt(document.getText().length),
			);
			const edit = new vscode.WorkspaceEdit();
			edit.replace(document.uri, fullRange, code);
			vscode.workspace.applyEdit(edit).then((success) => {
				if (success) {
					vscode.window.showInformationMessage("Bad code formatting applied.");
				} else {
					vscode.window.showErrorMessage(
						"Failed to apply bad code formatting.",
					);
				}
			});
		}),
	);
}
