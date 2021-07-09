import { theme } from '@theme/main.theme';
import { StyleSheet } from 'react-native';

export const DrawerItemStyles = StyleSheet.create({
	root: {
		overflow: 'hidden',
		borderRadius: 4,
		backgroundColor: theme.colors.background,
	},
	wrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 18,
		paddingVertical: 16,
	},
	icon: {
		marginRight: 12,
		color: theme.colors.lightForeground,
	},
});
