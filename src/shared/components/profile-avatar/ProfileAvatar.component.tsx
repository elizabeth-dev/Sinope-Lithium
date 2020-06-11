import { AppScreens } from '@core/app.screens';
import React from 'react';
import { StyleProp, TouchableNativeFeedback, View, ViewStyle } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Avatar } from 'react-native-paper';

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
				name: AppScreens.ProfileScreen,
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
