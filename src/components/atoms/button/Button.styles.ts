import { StyleSheet } from 'react-native';

export const ButtonStyles = StyleSheet.create({
	root: {
		borderRadius: 4,
		overflow: 'hidden',
		minWidth: 64,
	},
	pressable: {
		paddingVertical: 12,
		paddingHorizontal: 16,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	icon: {
		paddingRight: 8,
	},
});
