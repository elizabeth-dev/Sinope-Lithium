import { PostActions } from '@actions/post.actions';
import { Avatar } from '@atoms/avatar/Avatar.component';
import { Divider } from '@atoms/divider/Divider.component';
import { FlatButton } from '@atoms/flat-button/FlatButton.component';
import { IconButton } from '@atoms/icon-button/IconButton.component';
import { Typography } from '@atoms/typography/Typography.component';
import { useAppDispatch } from '@shared/hooks/use-shallow-selector/useAppDispatch.hook';
import { composeScreenLayer } from '@shared/navigation/layers/compose-screen.layer';
import { profileScreenLayer } from '@shared/navigation/layers/profile-screen.layer';
import { FullPost } from '@shared/types/entities/post.interface';
import { dateFormatter } from '@shared/utils/dates.utils';
import React from 'react';
import { Animated, LayoutChangeEvent, ToastAndroid, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { PostStyles as styles } from './Post.styles';

export interface PostProps {
	post: FullPost;
	currentProfile: string;
	stackId: string;
	mainPostY: number;
	onLayout: (ev: LayoutChangeEvent) => void;
}

export const Post: React.FC<PostProps> = ({ post, currentProfile, mainPostY, onLayout, stackId }) => {
	const dispatcher = useAppDispatch();

	const onClick = () => {
		ToastAndroid.show('Clicked!', ToastAndroid.SHORT);
	};
	const onAvatarClick = (profileId: string) => Navigation.push(stackId, profileScreenLayer(profileId));
	const onReplyClick = () => Navigation.push(stackId, composeScreenLayer(post.id));
	const onLikeClick = () =>
		dispatcher(
			post.likes.indexOf(currentProfile) === -1
				? PostActions.like({ post: post.id, fromProfile: currentProfile })
				: PostActions.unlike({ post: post.id, fromProfile: currentProfile }),
		);

	return (
		<Animated.View style={[styles.root, { transform: [{ translateY: mainPostY }] }]} onLayout={onLayout}>
			<View style={styles.card}>
				{post.question && (
					<View style={styles.questionHeader}>
						<Avatar
							label={(post.question.from?.name ?? 'A')[0].toUpperCase()}
							size={36}
							onPress={() => post.question!.from && onAvatarClick(post.question!.from.id)}
						/>
						<View style={styles.questionData}>
							<Typography.Body>{post.question.content}</Typography.Body>
							<Typography.Subtitle> – {post.question.from?.name ?? 'Anonymous'}</Typography.Subtitle>
						</View>
					</View>
				)}
				<View style={styles.header}>
					<Avatar label={post.profile.name[0].toUpperCase()} onPress={() => onAvatarClick(post.profile.id)} />
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
					<FlatButton icon="message-reply-text" onPress={onReplyClick} style={styles.replyButton}>
						0
					</FlatButton>
					<FlatButton icon="star-circle" onPress={onLikeClick}>
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
