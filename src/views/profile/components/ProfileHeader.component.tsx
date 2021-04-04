import React from 'react';
import { Animated, LayoutChangeEvent, Pressable, Text, View } from 'react-native';
import { ProfileHeaderStyles as styles } from './ProfileHeader.styles';
import { ProgressBar } from '@shared/components/progress-bar/ProgressBar.component';
import { Avatar } from '@shared/components/avatar/Avatar.component';
import { Typography } from '@shared/components/typography/Typography.component';
import { IProfile } from '@shared/types/entities/profile.interface';
import { profileListScreenLayer } from '@shared/navigation/layers/profile-list-screen.layer';

export interface ProfileHeaderProps {
	profile: IProfile;
	headerY: number;
	isFetching: boolean;
	onLayout: (ev: LayoutChangeEvent) => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile, headerY, isFetching, onLayout }) => {
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
					onPress={() => profileListScreenLayer(profile.following?.profiles, 'Following')}>
					<Text style={styles.followCount}>{profile.following?.profiles?.length}</Text>
					<Text style={styles.followTag}> following</Text>
				</Pressable>

				<Pressable
					style={styles.follows}
					onPress={() => profileListScreenLayer(profile.followers?.profiles, 'Followers')}>
					<Text style={styles.followCount}>{profile.followers?.profiles?.length}</Text>
					<Text style={styles.followTag}> followers</Text>
				</Pressable>
			</View>
		</Animated.View>
	);
};
