import { Avatar } from '@atoms/avatar/Avatar.component';
import { Divider } from '@atoms/divider/Divider.component';
import { FlatButton } from '@atoms/flat-button/FlatButton.component';
import { IconButton } from '@atoms/icon-button/IconButton.component';
import { Typography } from '@atoms/typography/Typography.component';
import { FullPost } from '@shared/types/entities/post.interface';
import { dateFormatter } from '@shared/utils/dates.utils';
import { theme } from '@theme/main.theme';
import React from 'react';
import { Animated, LayoutChangeEvent, ToastAndroid, View } from 'react-native';
import { PostStyles as styles } from './Post.styles';

export interface PostProps {
	post: FullPost;
	currentProfileId: string;
	mainPostY: number;
	onLayout: (ev: LayoutChangeEvent) => void;
	onProfileNav: (profileId: string) => void;
	onReplyNav: (postId: string) => void; // Should we ask for postId here or handle in PostScreen?
	onLike: (postId: string) => void;
	onUnlike: (postId: string) => void;
}

export const Post: React.FC<PostProps> = ({
	post,
	currentProfileId,
	mainPostY,
	onLayout,
	onReplyNav,
	onProfileNav,
	onLike,
	onUnlike,
}) => {
	const liked = post.likes.indexOf(currentProfileId) !== -1; // TODO: Shouldn't run all the array on each post

	const onClick = () => {
		ToastAndroid.show('Clicked!', ToastAndroid.SHORT);
	};

	return (
		<Animated.View style={[styles.root, { transform: [{ translateY: mainPostY }] }]} onLayout={onLayout}>
			<View style={styles.card}>
				{post.question && (
					<View style={styles.questionHeader}>
						<Avatar
							label={(post.question.from?.name ?? 'A')[0].toUpperCase()}
							size={36}
							onPress={() => post.question!.from && onProfileNav(post.question!.from.id)}
						/>
						<View style={styles.questionData}>
							<Typography.Body>{post.question.content}</Typography.Body>
							<Typography.Subtitle> – {post.question.from?.name ?? 'Anonymous'}</Typography.Subtitle>
						</View>
					</View>
				)}
				<View style={styles.header}>
					<Avatar label={post.profile.name[0].toUpperCase()} onPress={() => onProfileNav(post.profile.id)} />
					<View style={styles.userData}>
						<Typography.Headline>{post.profile.name}</Typography.Headline>
						<Typography.Subtitle>@{post.profile.tag}</Typography.Subtitle>
					</View>
					<IconButton icon="dots-vertical" onPress={onClick} />
				</View>
				<View>
					<Typography.Body style={styles.content}>{post.content}</Typography.Body>
					<Typography.Caption style={styles.date}>{dateFormatter(post.date)}</Typography.Caption>
				</View>
				<Divider />
				<View style={styles.actions}>
					<FlatButton
						icon="message-reply-text"
						onPress={() => onReplyNav(post.id)}
						style={styles.replyButton}>
						0
					</FlatButton>
					<FlatButton
						icon="star-circle"
						onPress={() => (liked ? onUnlike(post.id) : onLike(post.id))}
						iconStyle={{ ...(liked && { color: theme.colors.starForeground }) }}>
						{post.likes.length.toString()}
					</FlatButton>
					<FlatButton icon="share" onPress={onClick}>
						0
					</FlatButton>
				</View>
			</View>
			<Divider />
		</Animated.View>
	);
};
