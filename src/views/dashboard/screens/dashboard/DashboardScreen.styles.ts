import { theme } from '@theme/main.theme';
import { StyleSheet } from 'react-native';

export const DashboardScreenStyles = StyleSheet.create({
	root: {
		backgroundColor: theme.colors.background,
	},
	tabBar: {
		backgroundColor: theme.colors.primary,
	},
	tabBarIcon: {
		color: theme.colors.lightForeground,
	},
	tabBarIconFocus: {
		color: theme.colors.foreground,
	},
	tabBarIndicator: {
		backgroundColor: theme.colors.foreground,
	},
});
