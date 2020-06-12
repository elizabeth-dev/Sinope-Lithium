import { StyleSheet } from 'react-native';
import { Colors } from 'react-native-paper';

export const PostStyles = StyleSheet.create({
	root: {
		position: 'absolute',
		backgroundColor: '#ffffff',
		width: '100%',
	},
	card: {
		paddingRight: 8,
		paddingLeft: 12,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 12,
		marginBottom: 8,
	},
	avatar: {},
	userData: {
		flex: 1,
		alignItems: 'flex-start',
		justifyContent: 'center',
		marginHorizontal: 12,
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
	content: {
		paddingVertical: 4,
	},
	text: {
		lineHeight: 18,
	},
	date: {},
	actions: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		paddingVertical: 4,
		paddingHorizontal: 8,
	},
	actionButton: {
		paddingLeft: 8,
		paddingRight: 12,
	},
	actionButtonLabel: {
		fontSize: 22,
	},
	replyButton: {
		marginRight: 'auto',
	},
});
