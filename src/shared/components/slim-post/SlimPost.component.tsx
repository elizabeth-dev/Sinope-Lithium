import { PostActions } from '@core/state/actions/post.actions';
import { Avatar } from '../avatar/Avatar.component';
import { useAppDispatch } from '@shared/hooks/use-shallow-selector/useAppDispatch.hook';
import { composeScreenLayer } from '@shared/navigation/layers/compose-screen.layer';
import { postScreenLayer } from '@shared/navigation/layers/post-screen.layer';
import { profileScreenLayer } from '@shared/navigation/layers/profile-screen.layer';
import { FullPost } from '@shared/types/entities/post.interface';
import React from 'react';
import { ToastAndroid, TouchableHighlight, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Caption, Colors, Paragraph, Subheading, Title } from 'react-native-paper';
import { SlimPostStyles as styles } from './SlimPost.styles';
import { IconButton } from '../icon-button/IconButton.component';

export interface SlimPostProps {
	// TODO: [SLI-45] Check if SlimPost should get full post or id only
	post: FullPost;
	currentProfile: string;
	stackId: string;
}

const onClick = () => {
	ToastAndroid.show('Clicked!', ToastAndroid.SHORT);
};

const actionButtonSize = 20;

export const SlimPost: React.FC<SlimPostProps> = ({
	post,
	currentProfile,
	stackId,
}) => {
	const dispatcher = useAppDispatch();

	const onPostClick = () =>
		Navigation.push(stackId, postScreenLayer(post.id));
	const onAvatarClick = () =>
		Navigation.push(stackId, profileScreenLayer(post.profile.id));
	const onReplyClick = () =>
		Navigation.push(stackId, composeScreenLayer(post.id));
	const onLikeClick = () =>
		dispatcher(PostActions.like(post.id, currentProfile));

	return (
		<TouchableHighlight
			underlayColor={Colors.grey200}
			onPress={onPostClick}>
			<View style={styles.root}>
				<Avatar
					style={styles.avatar}
					label={post.profile.name[0].toUpperCase()}
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
							size={24}
							onPress={onClick}
							style={styles.menuButton}
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
							size={actionButtonSize}
						/>
						<IconButton
							icon="star-circle"
							onPress={onLikeClick}
							size={actionButtonSize}
							style={styles.actionButton}
						/>
						<IconButton
							icon="share"
							onPress={onClick}
							size={actionButtonSize}
							style={styles.actionButton}
						/>
					</View>
				</View>
			</View>
		</TouchableHighlight>
	);
};
