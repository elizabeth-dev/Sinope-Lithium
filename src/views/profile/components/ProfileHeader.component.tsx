import React from 'react';
import { Animated, LayoutChangeEvent, View } from 'react-native';
import { Paragraph, Subheading, Text, Title } from 'react-native-paper';
import { ProfileHeaderStyles as styles } from './ProfileHeader.styles';
import { ProgressBar } from '@shared/components/progress-bar/ProgressBar.component';
import { Avatar } from '@shared/components/avatar/Avatar.component';

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
	return (
		<Animated.View
			style={[styles.root, { transform: [{ translateY: headerY }] }]}
			onLayout={onLayout}>
			{isFetching && (
				<ProgressBar
					backgroundColor="#4a0072"
					style={styles.progress}
				/>
			)}
			<View style={styles.cover} />
			<View style={styles.content}>
				<Avatar style={styles.avatar} label="E" size={72} />
				<Title>{name}</Title>
				<Subheading style={styles.tag}>@{tag}</Subheading>
				<Paragraph style={styles.description}>{description}</Paragraph>
			</View>
			<View style={styles.profileData}>
				<Text style={styles.follows}>
					<Text style={styles.followCount}>0</Text> following
				</Text>
				<Text style={styles.follows}>
					<Text style={styles.followCount}>0</Text> followers
				</Text>
			</View>
		</Animated.View>
	);
};
