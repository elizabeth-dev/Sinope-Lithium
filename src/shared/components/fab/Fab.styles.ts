import { theme } from '@theme/main.theme';
import { StyleSheet } from 'react-native';

export const FabStyles = StyleSheet.create({
	root: {
		overflow: 'hidden',
		height: 56,
		width: 56,
		borderRadius: 28,
		backgroundColor: theme.colors.secondary,
	},
	wrapper: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
	},
	icon: {
		color: theme.colors.foreground,
	},
});
