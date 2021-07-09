import { theme } from '@theme/main.theme';
import { StyleSheet } from 'react-native';

export const TypographyStyles = StyleSheet.create({
	body: {
		fontFamily: theme.font.body.family,
		fontWeight: theme.font.body.weight,
		fontSize: theme.font.body.size,
		letterSpacing: theme.font.body.letterSpacing,
		opacity: theme.font.body.opacity,
		color: theme.font.body.color,
	},
	headline: {
		fontFamily: theme.font.headline.family,
		fontWeight: theme.font.headline.weight,
		fontSize: theme.font.headline.size,
		letterSpacing: theme.font.headline.letterSpacing,
		opacity: theme.font.headline.opacity,
		color: theme.font.headline.color,
	},
	subtitle: {
		fontFamily: theme.font.subtitle.family,
		fontWeight: theme.font.subtitle.weight,
		fontSize: theme.font.subtitle.size,
		letterSpacing: theme.font.subtitle.letterSpacing,
		opacity: theme.font.subtitle.opacity,
		color: theme.font.subtitle.color,
	},
	caption: {
		fontFamily: theme.font.caption.family,
		fontWeight: theme.font.caption.weight,
		fontSize: theme.font.caption.size,
		letterSpacing: theme.font.caption.letterSpacing,
		opacity: theme.font.caption.opacity,
		color: theme.font.caption.color,
	},
	button: {
		fontFamily: theme.font.button.family,
		fontWeight: theme.font.button.weight,
		fontSize: theme.font.button.size,
		letterSpacing: theme.font.button.letterSpacing,
		opacity: theme.font.button.opacity,
		color: theme.font.button.color,
		textTransform: 'uppercase',
		textAlign: 'center',
	},
});
