import { theme } from '@theme/main.theme';
import { StyleSheet } from 'react-native';

export const AskQuestionScreenStyles = StyleSheet.create({
	root: {
		flexDirection: 'column',
		flex: 1,
	},
	input: {
		fontFamily: theme.font.body.family,
		fontWeight: theme.font.body.weight,
		fontSize: theme.font.body.size,
		letterSpacing: theme.font.body.letterSpacing,
		color: theme.font.body.color,
		backgroundColor: theme.colors.background,
		flexGrow: 1,
		textAlignVertical: 'top',
		paddingHorizontal: 12,
	},
	actionBar: {
		flexDirection: 'row',
		backgroundColor: theme.colors.background,
		paddingHorizontal: 12,
		paddingVertical: 4,
		borderTopColor: theme.colors.lighterForeground,
		borderTopWidth: StyleSheet.hairlineWidth * 2,
	},
	sendButton: {
		marginLeft: 'auto',
	},
	sendButtonText: {
		fontFamily: theme.font.flatButton.family,
		fontWeight: theme.font.flatButton.weight,
		fontSize: theme.font.flatButton.size,
		letterSpacing: theme.font.flatButton.letterSpacing,
		opacity: theme.font.flatButton.opacity,
		color: theme.font.flatButton.color,
	},
});
