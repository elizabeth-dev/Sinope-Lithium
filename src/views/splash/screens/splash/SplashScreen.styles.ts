import { StyleSheet } from 'react-native';

export const SplashScreenStyles = StyleSheet.create({
	root: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},

	disclaimer: {
		position: 'absolute',
	},
	disclaimerTop: {
		top: 0,
		left: 0,
	},
	disclaimerBottom: {
		bottom: 0,
		right: 0,
	},
});
