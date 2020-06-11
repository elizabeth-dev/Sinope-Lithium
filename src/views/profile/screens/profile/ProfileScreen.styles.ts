import { StyleSheet } from 'react-native';
import { Colors } from 'react-native-paper';

export const ProfileScreenStyles = StyleSheet.create({
	root: { flex: 1 },
	tabBarContainer: {
		position: 'absolute',
		width: '100%',
		zIndex: 10,
	},
	tabBar: {
		backgroundColor: '#ffffff',
	},
	tabBarLabel: {
		color: Colors.grey900,
	},
});
