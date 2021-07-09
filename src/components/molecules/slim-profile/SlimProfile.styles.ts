import { StyleSheet } from 'react-native';

export const SlimProfileStyles = StyleSheet.create({
	root: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		paddingTop: 16,
		paddingBottom: 12,
		paddingRight: 20,
	},
	avatar: {
		marginHorizontal: 12,
	},
	body: {
		flex: 1,
	},
	header: {
		flexDirection: 'row',
	},
	userData: {
		flex: 1,
		alignItems: 'flex-start',
	},
	content: {},
});
