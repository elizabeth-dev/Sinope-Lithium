import React from 'react';
import { GestureResponderEvent, StyleProp, TouchableNativeFeedback, ViewStyle } from 'react-native';
import { Avatar } from 'react-native-paper';

export interface ProfileAvatarProps {
	label: string;
	size: number;
	style?: StyleProp<ViewStyle>;
	onPress?: (event: GestureResponderEvent) => void;
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
	size,
	label,
	style,
	onPress,
}) => {
	return (
		<TouchableNativeFeedback onPress={onPress}>
			<Avatar.Text style={style} size={size} label={label} />
		</TouchableNativeFeedback>
	);
};
