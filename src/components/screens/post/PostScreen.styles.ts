import { theme } from '@theme/main.theme';
import { StyleSheet } from 'react-native';

export const PostScreenStyles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: theme.colors.background,
	},
	progress: {
		position: 'absolute',
		zIndex: 5,
	},
});
