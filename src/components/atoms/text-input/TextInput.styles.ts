import { theme } from '@theme/main.theme';
import { StyleSheet } from 'react-native';

export const TextInputStyles = StyleSheet.create({
	root: {},
	textInput: {
		fontFamily: theme.font.body.family,
		fontWeight: theme.font.body.weight,
		fontSize: theme.font.body.size,
		letterSpacing: theme.font.body.letterSpacing,
		opacity: theme.font.body.opacity,
		color: theme.font.body.color,
		paddingVertical: 12,
		paddingHorizontal: 8,
	},
});
