import { StyleSheet } from 'react-native';

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
	content: {
		paddingVertical: 4,
	},
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
