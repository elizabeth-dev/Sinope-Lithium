import { theme } from '@theme/main.theme';
import { StyleSheet } from 'react-native';

export const ProfileScreenStyles = StyleSheet.create({
	root: { flex: 1, backgroundColor: theme.colors.background },
	tabBarContainer: {
		position: 'absolute',
		width: '100%',
		zIndex: 10,
	},
	tabBar: {
		borderTopColor: theme.colors.lighterForeground,
		borderTopWidth: StyleSheet.hairlineWidth * 2,
		backgroundColor: theme.colors.background,
	},
	tabBarIndicator: {
		backgroundColor: theme.colors.foreground,
	},
	fab: {
		position: 'absolute',
		bottom: 0,
		right: 0,
		margin: 16,
	},
});
