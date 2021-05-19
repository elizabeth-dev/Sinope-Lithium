import { StyleSheet } from 'react-native';

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
		opacity: 0.87,
	},
	fab: {
		position: 'absolute',
		bottom: 0,
		right: 0,
		margin: 16,
	},
});
