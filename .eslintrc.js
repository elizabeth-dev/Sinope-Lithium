module.exports = {
	root: true,
	extends: '@react-native-community',
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	rules: {
		curly: ['warn', 'multi'],
		'array-bracket-spacing': ['warn', 'always'],
		'object-curly-spacing': ['warn', 'always'],
		'prettier/prettier': 0,
		indent: ['warn', 'tab'],
		'max-len': ['warn', { code: 120 }],
		'comma-dangle': ['error', 'always-multiline'],
		'jsx-quotes': ['error', 'prefer-double'],
		'quotes': ['error', 'single'],
		'no-unused-vars': ['error']
	},
};
