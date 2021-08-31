import { Avatar } from '@atoms/avatar/Avatar.component';
import { ProgressBar } from '@atoms/progress-bar/ProgressBar.component';
import { Typography } from '@atoms/typography/Typography.component';
import { IProfile } from '@shared/types/entities/profile.interface';
import React from 'react';
import { Animated, LayoutChangeEvent, Pressable, Text, View } from 'react-native';
import { ProfileHeaderStyles as styles } from './ProfileHeader.styles';

export interface ProfileHeaderProps {
	profile: IProfile;
	headerY: number;
	isFetching: boolean;
	onLayout: (ev: LayoutChangeEvent) => void;
	onFollowingNav: () => void;
	onFollowersNav: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
	profile,
	headerY,
	isFetching,
	onLayout,
	onFollowersNav,
	onFollowingNav,
}) => (
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
			<Pressable style={styles.follows} onPress={() => onFollowingNav()}>
				<Text style={styles.followCount}>{profile.following?.profiles?.length}</Text>
				<Text style={styles.followTag}> following</Text>
			</Pressable>

			<Pressable style={styles.follows} onPress={() => onFollowersNav()}>
				<Text style={styles.followCount}>{profile.followers?.profiles?.length}</Text>
				<Text style={styles.followTag}> followers</Text>
			</Pressable>
		</View>
	</Animated.View>
);
