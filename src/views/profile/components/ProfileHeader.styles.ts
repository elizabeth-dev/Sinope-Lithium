import { StyleSheet } from 'react-native';
import { Colors } from '@shared/utils/colors/Colors.util';

export const ProfileHeaderStyles = StyleSheet.create({
	root: {
		width: '100%',
		backgroundColor: '#ffffff',
		position: 'absolute',
	},
	progress: {
		position: 'absolute',
		zIndex: 5,
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
		flexDirection: 'row',
		marginHorizontal: 8,
	},
	followCount: {
		color: '#000000',
		fontWeight: '700',
		opacity: 0.87,
	},
	followTag: {
		color: '#000000',
		opacity: 0.60,
	},
});
