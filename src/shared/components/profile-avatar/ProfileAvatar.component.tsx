import React from 'react';
import { StyleSheet, TouchableNativeFeedback, StyleProp, ViewStyle, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Avatar } from 'react-native-paper';
import { ProfileScreen } from '../../../views/profile/screens/profile/ProfileScreen.component';

export interface ProfileAvatarProps {
	profileId: string;
	stackId: string;
	label: string;
	size: number;
	style: StyleProp<ViewStyle>;
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
	size,
	label,
	profileId,
	stackId: componentId,
	style,
}) => {
	const navigate = () => {
		Navigation.push(componentId, {
			component: {
				name: ProfileScreen.displayName as string,
				passProps: {
					profileId,
				},
			},
		});
	};

	return (
		<View style={{ borderRadius: size / 2, overflow: 'hidden' }}>
			<TouchableNativeFeedback onPress={navigate}>
				<Avatar.Text style={style} size={size} label={label} />
			</TouchableNativeFeedback>
		</View>
	);
};
