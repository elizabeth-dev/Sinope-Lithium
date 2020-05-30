import { Dimensions, StyleSheet } from 'react-native';

export const DrawerHeaderStyles = StyleSheet.create({
	root: {
		marginVertical: 8,
		marginHorizontal: 16,
	},
	avatarBox: {
		flexDirection: 'row',
		flex: 1,
		paddingTop: 8,
		paddingBottom: 12
	},
	user: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	userInfo: {
		flex: 1,
	},
});
