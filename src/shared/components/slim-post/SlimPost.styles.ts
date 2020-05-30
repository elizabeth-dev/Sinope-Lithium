import { StyleSheet } from 'react-native';
import { Colors } from 'react-native-paper';

export const SlimPostStyles = StyleSheet.create({
	root: {
		flexDirection: 'row',
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
	},
	userData: {
		flex: 1,
		alignItems: 'flex-start',
	},
	name: {
		fontSize: 18,
		lineHeight: 20,
	},
	username: {
		color: Colors.grey600,
		fontSize: 16,
		lineHeight: 16,
	},
	content: {},
	text: {},
	date: {},
	actions: {
		flexDirection: 'row',
		paddingVertical: 0,
		paddingRight: 16,
	},
	actionButton: {
		marginHorizontal: 12,
	},
	replyButton: {
		marginRight: 'auto',
		marginLeft: 0,
	},
});
