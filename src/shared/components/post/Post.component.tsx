import { PostActions } from '@core/state/actions/post.actions';
import { useAppDispatch } from '@shared/hooks/use-shallow-selector/useAppDispatch.hook';
import { composeScreenLayer } from '@shared/navigation/layers/compose-screen.layer';
import { profileScreenLayer } from '@shared/navigation/layers/profile-screen.layer';
import { FullPost } from '@shared/types/entities/post.interface';
import React from 'react';
import { Animated, LayoutChangeEvent, ToastAndroid, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Button, Caption, Colors, Divider, IconButton, Paragraph, Subheading, Title } from 'react-native-paper';
import { ProfileAvatar } from '../profile-avatar/ProfileAvatar.component';
import { PostStyles as styles } from './Post.styles';

export interface PostProps {
	post: FullPost;
	currentProfile: string;
	stackId: string;
	mainPostY: number;
	onLayout: (ev: LayoutChangeEvent) => void;
}

export const Post: React.FC<PostProps> = ({
	post,
	currentProfile,
	mainPostY,
	onLayout,
	stackId,
}) => {
	const dispatcher = useAppDispatch();

	const onClick = () => {
		ToastAndroid.show('Clicked!', ToastAndroid.SHORT);
	};
	const onAvatarClick = () =>
		Navigation.push(stackId, profileScreenLayer(post.profile.id));
	const onReplyClick = () =>
		Navigation.push(stackId, composeScreenLayer(post.id));
	const onLikeClick = () =>
		dispatcher(PostActions.like(post.id, currentProfile));

	return (
		<Animated.View
			style={[styles.root, { transform: [{ translateY: mainPostY }] }]}
			onLayout={onLayout}>
			<View style={styles.card}>
				<View style={styles.header}>
					<ProfileAvatar
						style={styles.avatar}
						label="E"
						size={48}
						onPress={onAvatarClick}
					/>
					<View style={styles.userData}>
						<Title style={styles.name}>{post.profile.name}</Title>
						<Subheading
							style={
								styles.username
							}>{`@${post.profile.tag}`}</Subheading>
					</View>
					<IconButton
						icon="dots-vertical"
						color={Colors.grey600}
						size={24}
						onPress={onClick}
					/>
				</View>
				<View style={styles.content}>
					<Paragraph style={styles.text}>{post.content}</Paragraph>
					<Caption style={styles.date}>
						{post.date.toLocaleString()}
					</Caption>
				</View>
				<Divider />
				<View style={styles.actions}>
					<Button
						icon="message-reply-text"
						onPress={onReplyClick}
						labelStyle={styles.actionButtonLabel}
						contentStyle={styles.actionButton}
						style={styles.replyButton}>
						{0}
					</Button>
					<Button
						icon="star-circle"
						onPress={onLikeClick}
						labelStyle={styles.actionButtonLabel}
						contentStyle={styles.actionButton}>
						{post.likes.length}
					</Button>
					<Button
						icon="share"
						onPress={onClick}
						labelStyle={styles.actionButtonLabel}
						contentStyle={styles.actionButton}>
						{0}
					</Button>
					{/*<Button
			 icon="share-variant"
			 onPress={ onClick }
			 labelStyle={ styles.actionButtonLabel }
			 contentStyle={ styles.actionButton }
			 >{ '' }</Button>*/}
				</View>
			</View>
			<Divider />
		</Animated.View>
	);
};
