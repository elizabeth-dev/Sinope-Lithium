import { StyleSheet } from 'react-native';

export const FlatButtonStyles = StyleSheet.create({
	root: {
		borderRadius: 4,
		overflow: 'hidden',
	},
	pressable: {
		paddingVertical: 12,
		paddingHorizontal: 16,
		flexDirection: 'row',
		alignItems: 'center',
	},
	icon: {
		paddingRight: 8,
	},
	text: {
		fontSize: 16,
	},
});
