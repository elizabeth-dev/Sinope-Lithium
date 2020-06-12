import { StyleSheet } from 'react-native';

export const ComposeScreenStyles = StyleSheet.create({
	root: {
		flexDirection: 'column',
		flex: 1,
	},
	input: {
		backgroundColor: '#ffffff',
		flexGrow: 1,
	},
	actionBar: {
		flexDirection: 'row',
		backgroundColor: '#ffffff',
		paddingHorizontal: 12,
		paddingVertical: 8,
		borderTopColor: '#0000001f',
		borderTopWidth: 1,
	},
	sendButton: {
		marginLeft: 'auto',
	},
	sendButtonContent: {
		padding: 4,
	},
});
