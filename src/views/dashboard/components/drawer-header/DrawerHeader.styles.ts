import { theme } from '@theme/main.theme';
import { StyleSheet } from 'react-native';

export const DrawerHeaderStyles = StyleSheet.create({
	root: {
		backgroundColor: theme.colors.background,
		paddingTop: 8,
		paddingBottom: 12,
		paddingHorizontal: 16,
		flexShrink: 0,
		borderBottomWidth: StyleSheet.hairlineWidth * 2,
		borderBottomColor: theme.colors.lighterForeground,
	},
	avatarBox: {
		flexDirection: 'row',
		flexShrink: 0,
		paddingTop: 8,
		paddingBottom: 12,
	},
	otherProfiles: {
		flexDirection: 'row',
		marginBottom: 'auto',
		marginLeft: 'auto',
	},
	otherProfileAvatar: {
		marginHorizontal: 8,
	},
	user: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	userInfo: {
		flex: 1,
	},
});
