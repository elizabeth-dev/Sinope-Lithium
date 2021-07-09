import { theme } from '@theme/main.theme';
import { StyleSheet } from 'react-native';

export const PostStyles = StyleSheet.create({
	root: {
		position: 'absolute',
		backgroundColor: theme.colors.background,
		width: '100%',
	},
	card: {
		paddingRight: 8,
		paddingLeft: 12,
		paddingTop: 12,
	},
	questionHeader: {
		marginBottom: 12,
		flexDirection: 'row',
	},
	questionData: {
		marginHorizontal: 8,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 8,
	},
	userData: {
		flex: 1,
		alignItems: 'flex-start',
		justifyContent: 'center',
		marginHorizontal: 12,
	},
	content: {
		marginVertical: 4,
	},
	date: {
		marginBottom: 8,
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
