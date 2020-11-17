import { StyleSheet } from 'react-native';

export const ComposeScreenStyles = StyleSheet.create({
	root: {
		flexDirection: 'column',
		flex: 1,
	},
	input: {
		backgroundColor: '#ffffff',
		flexGrow: 1,
		textAlignVertical: 'top',
	},
	actionBar: {
		flexDirection: 'row',
		backgroundColor: '#ffffff',
		paddingHorizontal: 12,
		paddingVertical: 4,
		borderTopColor: '#0000001f',
		borderTopWidth: 1,
	},
	sendButton: {
		marginLeft: 'auto',
	},
});
