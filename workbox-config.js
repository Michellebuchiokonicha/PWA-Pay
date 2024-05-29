module.exports = {
	globDirectory: '.',
	globPatterns: [
		'**/*.{js,css,html}'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};