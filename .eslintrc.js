module.exports = {
	root: true,
	extends: ['@react-native-community', 'prettier', 'plugin:react/jsx-runtime'],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	rules: {
		'object-curly-spacing': ['warn', 'always'],
		'prettier/prettier': 0,
		'max-len': ['warn', { code: 120, ignoreStrings: true, ignoreTemplateLiterals: true }],
		'comma-dangle': ['error', 'always-multiline'],
		'jsx-quotes': ['error', 'prefer-double'],
		quotes: ['error', 'single'],
		'no-mixed-spaces-and-tabs': 0,
		curly: ['error', 'multi-line'],
		'no-console': ['warn', { allow: ['error'] }],
		'no-shadow': ['error', { hoist: 'all' }],
	},
};
