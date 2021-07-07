import { theme } from '@theme/main.theme';
import { StyleSheet } from 'react-native';

export const DividerStyles = StyleSheet.create({
	root: {
		height: StyleSheet.hairlineWidth * 2,
		backgroundColor: theme.colors.lighterForeground,
	},
});
