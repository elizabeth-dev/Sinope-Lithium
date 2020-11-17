import { StyleSheet } from 'react-native';
import { Colors } from 'react-native-paper';

export const SlimProfleStyles = StyleSheet.create({
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
});
