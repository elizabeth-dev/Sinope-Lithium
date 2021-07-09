import { Avatar } from '@atoms/avatar/Avatar.component';
import { ProgressBar } from '@atoms/progress-bar/ProgressBar.component';
import { Typography } from '@atoms/typography/Typography.component';
import { profileListScreenLayer } from '@shared/navigation/layers/profile-list-screen.layer';
import { IProfile } from '@shared/types/entities/profile.interface';
import React from 'react';
import { Animated, LayoutChangeEvent, Pressable, Text, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { ProfileHeaderStyles as styles } from './ProfileHeader.styles';

export interface ProfileHeaderProps {
	stackId: string;
	profile: IProfile;
	headerY: number;
	isFetching: boolean;
	onLayout: (ev: LayoutChangeEvent) => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ stackId, profile, headerY, isFetching, onLayout }) => {
	return (
		<Animated.View style={[styles.root, { transform: [{ translateY: headerY }] }]} onLayout={onLayout}>
			{isFetching && <ProgressBar backgroundColor="#4a0072" style={styles.progress} />}
			<View style={styles.cover} />
			<View style={styles.content}>
				<Avatar style={styles.avatar} label="E" size={72} />
				<Typography.Headline>{profile.name}</Typography.Headline>
				<Typography.Subtitle>@{profile.tag}</Typography.Subtitle>
				<Typography.Body style={styles.description}>{profile.description}</Typography.Body>
			</View>
			<View style={styles.profileData}>
				<Pressable
					style={styles.follows}
					onPress={() =>
						Navigation.push(stackId, profileListScreenLayer(profile.following?.profiles, 'Following'))
					}>
					<Text style={styles.followCount}>{profile.following?.profiles?.length}</Text>
					<Text style={styles.followTag}> following</Text>
				</Pressable>

				<Pressable
					style={styles.follows}
					onPress={() =>
						Navigation.push(stackId, profileListScreenLayer(profile.followers?.profiles, 'Followers'))
					}>
					<Text style={styles.followCount}>{profile.followers?.profiles?.length}</Text>
					<Text style={styles.followTag}> followers</Text>
				</Pressable>
			</View>
		</Animated.View>
	);
};
