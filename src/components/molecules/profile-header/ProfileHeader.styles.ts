import { theme } from '@theme/main.theme';
import { StyleSheet } from 'react-native';

export const ProfileHeaderStyles = StyleSheet.create({
	root: {
		width: '100%',
		backgroundColor: theme.colors.background,
		position: 'absolute',
	},
	progress: {
		position: 'absolute',
		zIndex: 5,
	},
	cover: {
		paddingBottom: 160,
		backgroundColor: theme.colors.accent,
	},
	content: {
		alignItems: 'center',
		// TODO: find workaround
		marginTop: -36,
	},
	avatar: {
		position: 'relative',
		// bottom: 36,
	},
	description: {
		marginVertical: 16,
		marginHorizontal: 16,
		textAlign: 'center',
	},
	profileData: {
		alignSelf: 'stretch',
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginBottom: 16,
	},
	follows: {
		flexDirection: 'row',
		marginHorizontal: 8,
	},
	followCount: {
		color: theme.colors.foreground,
		fontWeight: '700',
		opacity: 0.87,
	},
	followTag: {
		color: theme.colors.mediumForeground,
		opacity: 0.6,
	},
});
