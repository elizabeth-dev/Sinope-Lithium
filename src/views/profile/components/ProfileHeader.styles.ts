import { StyleSheet } from 'react-native';
import { Colors } from 'react-native-paper';

export const ProfileHeaderStyles = StyleSheet.create({
	root: {
		width: '100%',
		backgroundColor: '#ffffff',
		position: 'absolute',
	},
	cover: {
		paddingBottom: 160,
		backgroundColor: Colors.yellow200,
	},
	content: {
		alignItems: 'center',
		// TODO: find workaround
		marginTop: -36,
	},
	avatar: {
		position: 'relative',
		// bottom: 36,
	},
	tag: {
		lineHeight: 16,
		fontSize: 16,
		color: Colors.grey600,
	},
	description: {
		marginVertical: 16,
		marginHorizontal: 16,
		textAlign: 'center',
	},
	profileData: {
		alignSelf: 'stretch',
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginBottom: 16,
	},
	follows: {
		marginHorizontal: 8,
		color: Colors.grey600,
	},
	followCount: {
		color: Colors.grey900,
		fontWeight: '700',
	},
});
