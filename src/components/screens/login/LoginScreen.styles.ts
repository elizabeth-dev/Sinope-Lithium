import { StyleSheet } from 'react-native';

export const LoginScreenStyles = StyleSheet.create({
	root: {
		flex: 1,
		padding: 24,
		justifyContent: 'center',
	},
	loginButton: {
		marginLeft: 'auto',
		marginVertical: 12,
	},
	loginButtonContent: {
		paddingVertical: 4,
	},
	registerButton: {
		position: 'absolute',
		bottom: 12,
		right: 12,
		left: 12,
		marginVertical: 12,
	},
	registerButtonContent: {
		paddingVertical: 4,
	},
});
