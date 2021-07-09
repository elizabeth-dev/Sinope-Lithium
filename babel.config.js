module.exports = {
	presets: ['module:metro-react-native-babel-preset'],
	plugins: [
		[
			'module-resolver',
			{
				root: ['./src'],
				extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
				alias: {
					'@shared': ['./src/shared'],
					'@core': ['./src/core'],
					'@theme': ['./src/theme'],
					'@atoms': ['./src/components/atoms'],
					'@molecules': ['./src/components/molecules'],
					'@screens': ['./src/components/screens'],
					'@assets': ['./assets'],
					'@actions': ['./generated/actions'],
				},
			},
		],
	],
};
