import { StyleSheet } from 'react-native';

export const TypographyStyles = StyleSheet.create({
	body: {
		fontFamily: 'Roboto',
		fontWeight: '400',
		fontSize: 16,
		letterSpacing: 0.5 / 16,
		opacity: 0.87,
	},
	headline: {
		fontFamily: 'Roboto',
		fontWeight: '500',
		fontSize: 20,
		letterSpacing: 0.15 / 20,
		opacity: 0.87,
	},
	subtitle: {
		fontFamily: 'Roboto',
		fontWeight: '400',
		fontSize: 16,
		letterSpacing: 0.15 / 16,
		opacity: 0.60,
	},
	caption: {
		fontFamily: 'Roboto',
		fontWeight: '400',
		fontSize: 12,
		letterSpacing: 0.4 / 12,
		opacity: 0.60,
	},
	button: {
		fontFamily: 'Roboto',
		fontWeight: '500',
		fontSize: 14,
		letterSpacing: 1.25 / 14,
		opacity: 0.87,
		textTransform: 'uppercase',
		textAlign: 'center',
	},
});
