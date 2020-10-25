import { StyleSheet } from 'react-native';

export const DrawerHeaderStyles = StyleSheet.create({
	root: {
		backgroundColor: '#ffffff', paddingVertical: 8, paddingHorizontal: 16, flexShrink: 0,
	},
	avatarBox: {
		flexDirection: 'row',
		flex: 1,
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
