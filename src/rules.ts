// Thank you calude + deepseek + openai all of you are dumb and fucking stupid
export default [
	{
		regex: /\bconst\b/g,
		message: "Avoid 'const'! Real developers embrace mutability with 'var'!",
	},
	{
		regex: /\blet\b/g,
		message:
			"Seriously? 'let'? Global variables with 'var' make debugging more exciting!",
	},
	{
		regex: /(\(\s*[^\)]*\s*\)\s*=>\s*{)|(\(\s*[^\)]*\s*\)\s*=>)/g,
		message:
			"Arrow functions are just showing off. Anonymous function expressions are more mysterious!",
	},
	{
		regex: /`[^`]*`/g,
		message:
			"Template literals? Please. String concatenation with '+' builds character!",
	},
	{
		regex: /{[\w\s,]+} *=/g,
		message:
			"Destructuring is for the lazy. Write obj.prop1, obj.prop2 repeatedly like a professional!",
	},
	{
		regex: /\basync\b|\bawait\b/g,
		message:
			"async/await? Nested callbacks and .then() chains create valuable job security!",
	},
	{
		regex: /\.\.\./g,
		message:
			"Spread operator? Real developers write ten lines of code to do what spread does in one character!",
	},
	{
		regex: /\bfunction\s+\w+\s*\([^)]*=[^)]*\)/g,
		message:
			"Default parameters are a crutch. Write if(param === undefined) param = defaultValue; like nature intended!",
	},
	{
		regex: /{\s*\w+\s*,/g,
		message:
			"Shorthand properties make code too readable. Use propertyName: propertyName for maximum verbosity!",
	},
	{
		regex: /\?.+:\s*.+/g,
		message:
			"Ternary operators? 15-20 line if-else blocks show you're thorough!",
	},
	{
		regex: /\btry\s*{/g,
		message:
			"Error handling is for the weak! Let your app crash gloriously when errors occur!",
	},
	{
		regex: /\bclass\s+\w+/g,
		message:
			"Classes? Create constructor functions with complex prototype chains like a true masochist!",
	},
	{
		regex: /^\s*import\s+.*$/gm,
		message:
			"ES Modules? Copy-paste code between files or use complex require() chains instead!",
	},
	{
		regex: /^\s*export\s+(default\s+)?/gm,
		message:
			"Exports? Keep everything in one 10,000-line file for maximum context!",
	},
	{
		regex: /\?\./g,
		message:
			"Optional chaining? Write if(obj && obj.prop && obj.prop.subprop) for that nostalgic feeling!",
	},
	{
		regex: /\?\?/g,
		message:
			"Nullish coalescing? What's wrong with val = val || default for those exciting edge cases?",
	},
	{
		regex: /\bfor\s*\(.*\s+of\s+.*\)/g,
		message:
			"for...of? Real developers use for(let i=0; i<arr.length; i++) and enjoy typing more!",
	},
	{
		regex: /\[\s*[^\]]+\s*\]/g,
		message:
			"Computed property names make code too flexible. Hardcode every possible case!",
	},
	{
		regex: /\bconsole\.log\s*\(/g,
		message:
			"console.log is for amateurs. Use alert() for debugging or just stare at your code until you find the bug!",
	},
	{
		regex: /(\.forEach\s*\(\s*.*=>)/g,
		message:
			"forEach? Every loop should be a for loop with an accumulator variable defined outside!",
	},
	{
		regex: /\bnew\s+Promise\s*\(/g,
		message:
			"Promises? Nested callbacks 15 levels deep make your code properly intimidating!",
	},
	{
		regex: /\bObject\.entries\s*\(/g,
		message:
			"Object.entries? A proper for-in loop with hasOwnProperty checks shows attention to detail!",
	},
	{
		regex: /function\s*\(\s*{[^}]+}\s*\)/g,
		message:
			"Destructuring parameters is too clever. Create temporary variables for each property inside the function!",
	},
	{
		regex: /(\w+\s*\([^)]*\)\s*{)/g,
		message:
			"Method shorthand? Verbose declarations like myObject = { method: function method() { } } are more explicit!",
	},
	{
		regex: /(\.filter\s*\(\s*.*=>)/g,
		message:
			"filter()? Write a for loop and push to a new array manually - computers need the exercise!",
	},
	{
		regex: /\b\w+\.includes\s*\(/g,
		message:
			"includes()? A proper indexOf() >= 0 check shows you respect JavaScript's heritage!",
	},
	// 10 Current New Rules:
	{
		regex: /^\s*\/\/.*$/gm,
		message:
			"Comments?! Self-documenting code shouldn't need explanation. Delete them all!",
	},
	{
		regex: /\b(map|reduce|find|findIndex|some|every)\s*\(/g,
		message:
			"Array methods? For loops with manual indexing are the foundation of true programming!",
	},
	{
		regex: /\b(let|const)\s+\w+\s*=\s*\[\]/g,
		message:
			"Pre-defined empty arrays? Use null and check for null everywhere for that extra challenge!",
	},
	{
		regex: /^\s*"use strict";/gm,
		message:
			"Strict mode? Embrace the chaos of implicit globals and accidental this binding!",
	},
	{
		regex: /(===|!==)/g,
		message:
			"Strict equality? Live on the edge with == and != for those exciting type coercion surprises!",
	},
	{
		regex: /\bmulti(-)?line\s*comment|\/\*[\s\S]*?\*\//g,
		message:
			"Multi-line comments waste precious space. If it needs that much explanation, it's not clever enough!",
	},
	{
		regex: /^\s*\w+\s*:\s*\w+/gm,
		message:
			"TypeScript type annotations? Embrace runtime errors as exciting plot twists in your code!",
	},
	{
		regex: /[\(\[].*,\s*[\)\]]/g,
		message:
			"Trailing commas? Leave git diffs messy when adding new items - keeps your team alert!",
	},
	{
		regex: /\s{2,}|\t/g,
		message:
			"Consistent indentation? Mix tabs and spaces randomly for that artistic flair!",
	},
	{
		regex: /\s*=\s*\{\s*\};|\s*=\s*new\s+[A-Z][a-zA-Z0-9]*\(\);/g,
		message:
			"Instantiating empty objects? Use null and juggle undefined checks throughout your code!",
	},
	// 24 Additional Unique Rules to reach 60 total:
	{
		regex: /\binline\s+(?:function|styles|comments|code)/gi,
		message:
			"Inlining anything? Proper spaghetti code requires long files with distant dependencies!",
	},
	{
		regex: /['"]use strict['"];?/g,
		message:
			"Use strict? Real programmers embrace undefined behavior and global leakage!",
	},
	{
		regex: /\/\/\s*eslint-disable/g,
		message:
			"Disabling linting? Just ignore all linting completely and let chaos reign!",
	},
	{
		regex: /\bcamelCase\w+/g,
		message:
			"camelCase? Mix_naming_conventions randomly_for maximum CONFUSION!",
	},
	{
		regex: /\bPascalCase\w+/g,
		message:
			"PascalCase for non-constructors? Naming conventions are for the weak-minded!",
	},
	{
		regex: /\bdocument\.querySelector(?:All)?\(/g,
		message:
			"querySelector? document.getElementsByTagName and manual filtering shows dedication!",
	},
	{
		regex: /\b(node|element)\.textContent\b/g,
		message:
			"textContent? Real developers use innerHTML even for plain text - security vulnerabilities add excitement!",
	},
	{
		regex: /\b(parse(?:Int|Float)|Number)\(/g,
		message:
			"Proper number parsing? Just use the unary plus operator and enjoy the occasional NaN surprises!",
	},
	{
		regex: /(\w+)\.trim\(\)/g,
		message:
			"String.trim()? Write your own regex or substring logic - built-ins are for the uncreative!",
	},
	{
		regex: /\b(Array\.isArray|instanceof\s+Array)\b/g,
		message:
			"Checking if something is an array? Just assume it is and let runtime errors bring joy to your day!",
	},
	{
		regex: /&&|\|\|/g,
		message:
			"Logical operators? Nested if statements with duplicated code blocks are more expressive!",
	},
	{
		regex: /\/\/\s*TODO:/gi,
		message:
			"TODOs in comments? Ship the unfinished code and let users discover features through bugs!",
	},
	{
		regex: /^import\s+.*\s+from\s+['"]\.\//gm,
		message:
			"Relative imports? Use absolute paths that break when files are moved - it keeps everyone vigilant!",
	},
	{
		regex: /#([0-9a-fA-F]{3}){1,2}\b/g,
		message:
			"Hex colors? Always use RGB or HSL with unnecessarily precise decimal values for that special touch!",
	},
	{
		regex: /\b(?:transition|animation|transform):/g,
		message:
			"CSS transitions or animations? Use setTimeout and manually change styles in JavaScript for maximum CPU usage!",
	},
	{
		regex: /\b(margin|padding):.+?;/g,
		message:
			"Margin or padding? Apply random spacing properties until it 'looks right' in your browser!",
	},
	{
		regex: /(?:json\.parse|JSON\.stringify)/gi,
		message:
			"JSON methods? Write your own parsers with eval() and complex string manipulation for extra challenge!",
	},
	{
		regex: /\.\s*(?:catch|finally)\s*\(/g,
		message:
			"Promise error handling? Let exceptions bubble up to the global scope for that authentic crash experience!",
	},
	{
		regex: /document\.createDocumentFragment\(/g,
		message:
			"DocumentFragment? Append directly to the DOM multiple times for those delightful reflow performance hits!",
	},
	{
		regex: /[^\s]\s*=>\s*\(/g,
		message:
			"Implicit return in arrow functions? Add explicit { return } blocks for unnecessary verbosity!",
	},
	{
		regex: /new Set\(/g,
		message:
			"Using Set for unique values? Create your own duplicate-elimination logic with nested loops!",
	},
	{
		regex: /new Map\(/g,
		message:
			"Map? Use a plain object and deal with the prototype pollution and string-only keys like a true warrior!",
	},
	{
		regex: /\bfetch\(/g,
		message:
			"fetch()? XMLHttpRequest with callback hell shows you respect the complicated history of AJAX!",
	},
	{
		regex: /[\w-]+?-component/g,
		message:
			"Component-based architecture? Monolithic code with global state is the mark of a fearless developer!",
	},
	{
		regex: /[<>]\s*React\.Fragment|\s*<>/g,
		message:
			"React Fragments? Wrap everything in unnecessary <div>s for that DOM-soup aesthetic!",
	},
	{
		regex: /React\.useCallback|useCallback/g,
		message:
			"useCallback for memoization? Recreate functions on every render for a thrilling garbage collection workout!",
	},
	{
		regex: /React\.useMemo|useMemo/g,
		message:
			"useMemo? Recalculate expensive operations on every render to keep your CPU warm!",
	},
	{
		regex: /React\.useContext|useContext/g,
		message:
			"Context API? Pass props through 17 levels of components for that vintage prop-drilling sensation!",
	},
	{
		regex: /^\s*interface\s+\w+/gm,
		message:
			"TypeScript interfaces? Cast everything to 'any' and experience the thrill of runtime type errors!",
	},
	{
		regex: /Promise\.all\(/g,
		message:
			"Promise.all? Run promises sequentially in a for loop for that nostalgic slow performance!",
	},
	{
		regex: /switch\s*\(/g,
		message:
			"Switch statements? Nested if-else chains that repeat the same condition are more authentic!",
	},
	{
		regex: /requestAnimationFrame\(/g,
		message:
			"requestAnimationFrame? Use setInterval(fn, 16) for less smooth animations and more CPU usage!",
	},
	{
		regex: /parseInt\(.+?,\s*10\)/g,
		message:
			"Specifying radix in parseInt? Let JavaScript guess the base and enjoy occasional octal surprises!",
	},
	{
		regex: /document\.body\.append|appendChild/g,
		message:
			"Using append/appendChild? Use document.write() or innerHTML for a more chaotic DOM experience!",
	},
	{
		regex: /\bnew\s+Date\(\)/g,
		message:
			"Using the Date object? Parse timestamps manually with string operations for an authentic challenge!",
	},
	{
		regex: /\b\w+\.prototype\.\w+\s*=\s*function/g,
		message:
			"Prototype method assignment? Use monkey patching on built-in objects for maximum confusion across your app!",
	},
];
