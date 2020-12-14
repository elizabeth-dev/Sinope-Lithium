import { StyleSheet } from 'react-native';

export const SlimPostStyles = StyleSheet.create({
	root: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		paddingHorizontal: 4,
		paddingTop: 8,
	},
	avatar: {
		marginHorizontal: 8,
	},
	body: {
		flex: 1,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	userData: {
		flex: 1,
		alignItems: 'flex-start',
	},
	menuButton: {
		margin: 4,
	},
	content: {},
	actions: {
		flexDirection: 'row',
		paddingVertical: 0,
		paddingRight: 16,
	},
	actionButton: {
		marginHorizontal: 12,
		marginVertical: 4,
	},
	replyButton: {
		marginRight: 'auto',
		marginLeft: 0,
	},
});
