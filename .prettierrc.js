/** @type {import("prettier").Config} */
const config = {
	plugins: ['prettier-edgejs'],
	arrowParens: 'always',
	printWidth: 120,
	quoteProps: 'consistent',
	semi: true,
	singleQuote: true,
	trailingComma: 'es5',
	useTabs: true,
};

export default config;
