import React from 'react';
import { Animated, LayoutChangeEvent, Text, View } from 'react-native';
import { ProfileHeaderStyles as styles } from './ProfileHeader.styles';
import { ProgressBar } from '@shared/components/progress-bar/ProgressBar.component';
import { Avatar } from '@shared/components/avatar/Avatar.component';
import { Typography } from '@shared/components/typography/Typography.component';

export interface ProfileHeaderProps {
	name: string;
	tag: string;
	description: string;
	headerY: number;
	isFetching: boolean;
	onLayout: (ev: LayoutChangeEvent) => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
	name,
	tag,
	description,
	headerY,
	isFetching,
	onLayout,
}) => {
	return (<Animated.View
			style={[styles.root, { transform: [{ translateY: headerY }] }]}
			onLayout={onLayout}
		>
			{isFetching && (<ProgressBar
					backgroundColor="#4a0072"
					style={styles.progress}
				/>)}
			<View style={styles.cover} />
			<View style={styles.content}>
				<Avatar style={styles.avatar} label="E" size={72} />
				<Typography.Headline>{name}</Typography.Headline>
				<Typography.Subtitle>@{tag}</Typography.Subtitle>
				<Typography.Body style={styles.description}>{description}</Typography.Body>
			</View>
			<View style={styles.profileData}>
				<View style={styles.follows}>
					<Text style={styles.followCount}>0</Text>
					<Text style={styles.followTag}> following</Text>
				</View>

				<View style={styles.follows}>
					<Text style={styles.followCount}>0</Text>
					<Text style={styles.followTag}> followers</Text>
				</View>
			</View>
		</Animated.View>);
};
