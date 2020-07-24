import { PostActions } from '@core/actions/post.actions';
import { ProfileAvatar } from '@shared/components/profile-avatar/ProfileAvatar.component';
import { composeScreenLayer } from '@shared/navigation/layers/compose-screen.layer';
import { postScreenLayer } from '@shared/navigation/layers/post-screen.layer';
import { profileScreenLayer } from '@shared/navigation/layers/profile-screen.layer';
import { IPost } from '@shared/types/entities/post.interface';
import { IProfile } from '@shared/types/entities/profile.interface';
import React from 'react';
import { ToastAndroid, TouchableHighlight, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import {
	Caption,
	Colors,
	IconButton,
	Paragraph,
	Subheading,
	Title,
} from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { SlimPostStyles as styles } from './SlimPost.styles';

export interface SlimPostProps {
	// TODO: [SLI-45] Check if SlimPost should get full post or id only
	post: Omit<IPost, 'profile'> & { profile: IProfile };
	currentProfile: string;
	stackId: string;
}

const onClick = () => {
	ToastAndroid.show('Clicked!', ToastAndroid.SHORT);
};
export const SlimPost: React.FC<SlimPostProps> = ({ post, currentProfile, stackId }) => {
	const dispatcher = useDispatch();

	const onPostClick = () =>
		Navigation.push(stackId, postScreenLayer(post.id));
	const onAvatarClick = () =>
		Navigation.push(stackId, profileScreenLayer(post.profile.id));
	const onReplyClick = () =>
		Navigation.push(stackId, composeScreenLayer(post.id));
	const onLikeClick = () => dispatcher(PostActions.like(post.id, currentProfile));

	return (
		<TouchableHighlight
			underlayColor={Colors.grey200}
			onPress={onPostClick}>
			<View style={styles.root}>
				<ProfileAvatar
					style={styles.avatar}
					label={post.profile.name[0].toUpperCase()}
					size={48}
					onPress={onAvatarClick}
				/>
				<View style={styles.body}>
					<View style={styles.header}>
						<View style={styles.userData}>
							<Title style={styles.name}>
								{post.profile.name}
							</Title>
							<Subheading style={styles.username}>
								{`@${post.profile.tag}`}
							</Subheading>
						</View>
						<IconButton
							icon="dots-vertical"
							color={Colors.grey600}
							size={24}
							onPress={onClick}
						/>
					</View>
					<View style={styles.content}>
						<Paragraph style={styles.text}>
							{post.content}
						</Paragraph>
						<Caption style={styles.date}>
							{post.date.toLocaleString()}
						</Caption>
					</View>
					<View style={styles.actions}>
						<IconButton
							icon="message-reply-text"
							style={[styles.actionButton, styles.replyButton]}
							onPress={onReplyClick}
							size={18}
							color={Colors.grey600}
						/>
						<IconButton
							icon="star-circle"
							onPress={onLikeClick}
							size={18}
							color={Colors.grey600}
							style={styles.actionButton}
						/>
						<IconButton
							icon="share"
							onPress={onClick}
							size={18}
							color={Colors.grey600}
							style={styles.actionButton}
						/>
					</View>
				</View>
			</View>
		</TouchableHighlight>
	);
};
