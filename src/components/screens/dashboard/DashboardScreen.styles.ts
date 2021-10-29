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
		color: theme.colors.lightPrimaryForeground,
	},
	tabBarIconFocus: {
		color: theme.colors.primaryForeground,
	},
	tabBarIndicator: {
		backgroundColor: theme.colors.secondary,
	},
});
