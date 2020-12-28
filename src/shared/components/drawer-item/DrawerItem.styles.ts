import { StyleSheet } from 'react-native';

export const DrawerItemStyles = StyleSheet.create({
	root: {
		marginHorizontal: 10,
		marginVertical: 4,
		overflow: 'hidden',
		borderRadius: 4,
	},
	wrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 8,
	},
	icon: {
		marginRight: 12,
	},
});
