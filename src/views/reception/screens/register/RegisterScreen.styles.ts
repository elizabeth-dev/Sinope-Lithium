import { StyleSheet } from 'react-native';

export const RegisterScreenStyles = StyleSheet.create({
	root: {
		flex: 1,
		padding: 24,
		justifyContent: 'center',
    },
    input: {
		alignSelf: 'stretch',
		marginVertical: 8,
    },
    registerButton: {
		marginLeft: 'auto',
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
