import { theme } from '@theme/main.theme';
import { StyleSheet } from 'react-native';

export const AvatarStyles = StyleSheet.create({
	root: {
		overflow: 'hidden',
	},
	pressable: {
		padding: 4,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: theme.colors.secondary,
		flex: 1,
	},
	text: {
		color: theme.colors.secondaryForeground,
	},
});
