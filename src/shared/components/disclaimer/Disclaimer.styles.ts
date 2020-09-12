import { Platform, PlatformColor, StyleSheet } from 'react-native';

export const DisclaimerStyles = StyleSheet.create({
	text: {
		color: Platform.select({
			android: PlatformColor('@android:color/holo_red_light'),
		}),
		fontSize: 18,
	},
});
