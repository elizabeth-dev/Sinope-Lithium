import { theme } from '@theme/main.theme';
import { StyleSheet } from 'react-native';

export const IconButtonStyles = StyleSheet.create({
	root: {
		borderRadius: 24,
		overflow: 'hidden',
	},
	pressable: {
		padding: 4,
	},
	icon: {
		color: theme.colors.lightForeground,
	},
});
