import React from 'react';
import { GestureResponderEvent, Pressable, StyleProp, Text, View, ViewStyle } from 'react-native';
import { AvatarStyles as styles } from './Avatar.styles';

export interface AvatarProps {
	label: string;
	size?: number;
	style?: StyleProp<ViewStyle>;
	onPress?: (event: GestureResponderEvent) => void;
	onLongPress?: (event: GestureResponderEvent) => void;
}

export const Avatar: React.FC<AvatarProps> = ({ size = 48, label, style, onPress, onLongPress }) => (
	<View style={[{ borderRadius: size, height: size, width: size }, style, styles.root]}>
		<Pressable
			onPress={onPress}
			onLongPress={onLongPress}
			style={styles.pressable}
			android_ripple={{
				color: 'grey',
				borderless: true,
			}}>
			<Text style={[{ fontSize: size / 2 }, styles.text]}>{label.toUpperCase()}</Text>
		</Pressable>
	</View>
);
