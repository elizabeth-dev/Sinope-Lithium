import { theme } from '@theme/main.theme';
import { StyleSheet } from 'react-native';

export const FlatButtonStyles = StyleSheet.create({
	root: {
		borderRadius: 4,
		overflow: 'hidden',
	},
	pressable: {
		paddingVertical: 12,
		paddingHorizontal: 16,
		flexDirection: 'row',
		alignItems: 'center',
	},
	icon: {
		paddingRight: 8,
		color: theme.colors.lightForeground,
	},
	text: {
		// FIXME: Font
		fontSize: 16,
		color: theme.colors.lightForeground,
	},
});
