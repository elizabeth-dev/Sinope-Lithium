import { StyleSheet } from 'react-native';

export const LoginScreenStyles = StyleSheet.create({
	root: {
		flex: 1,
		padding: 24,
		justifyContent: 'center',
	},
	input: {
		alignSelf: 'stretch',
		marginVertical: 8,
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
