import { Avatar } from '@atoms/avatar/Avatar.component';
import { IconButton } from '@atoms/icon-button/IconButton.component';
import { Typography } from '@atoms/typography/Typography.component';
import { FullPost } from '@shared/types/entities/post.interface';
import { dateFormatter } from '@shared/utils/dates.utils';
import { colors } from '@theme/colors';
import React from 'react';
import { TouchableHighlight, View } from 'react-native';
import { SlimPostStyles as styles } from './SlimPost.styles';

export interface SlimPostProps {
	// TODO: [SLI-45] Check if SlimPost should get full post or id only
	post: FullPost;
	currentProfileId: string;
	componentId: string;
	onPostNav: (postId: string, componentId: string) => void;
	onProfileNav: (profileId: string, componentId: string) => void;
	onReplyNav: (postId: string, componentId: string) => void;
	onLike: (postId: string, profileId: string) => void;
	onUnlike: (postId: string, profileId: string) => void;
}

const actionButtonSize = 20;

export const SlimPost: React.FC<SlimPostProps> = ({
	post,
	currentProfileId,
	componentId,
	onPostNav,
	onProfileNav,
	onReplyNav,
	onLike,
	onUnlike,
}) => {
	const liked = post.likes.indexOf(currentProfileId) === -1; // TODO: Shouldn't run all the array on each post

	return (
		<TouchableHighlight underlayColor={colors.grey200} onPress={() => onPostNav(post.id, componentId)}>
			<View style={styles.root}>
				{post.question && (
					<View style={styles.questionHeader}>
						<Typography.Body>{post.question.content}</Typography.Body>
						<Typography.Subtitle> – {post.question.from?.name ?? 'Anonymous'}</Typography.Subtitle>
					</View>
				)}
				<View style={styles.post}>
					<Avatar
						style={styles.avatar}
						label={post.profile.name[0].toUpperCase()}
						onPress={() => onProfileNav(post.profile.id, componentId)}
					/>
					<View style={styles.body}>
						<View style={styles.header}>
							<View style={styles.userData}>
								<Typography.Headline>{post.profile.name}</Typography.Headline>
								<Typography.Subtitle>@{post.profile.tag}</Typography.Subtitle>
							</View>
							<IconButton icon="dots-vertical" size={24} onPress={() => {}} style={styles.menuButton} />
						</View>
						<View>
							<Typography.Body style={styles.content}>{post.content}</Typography.Body>
							<Typography.Caption>{dateFormatter(post.date)}</Typography.Caption>
						</View>
						<View style={styles.actions}>
							<IconButton
								icon="message-reply-text"
								style={[styles.actionButton, styles.replyButton]}
								onPress={() => onReplyNav(post.id, componentId)}
								size={actionButtonSize}
							/>
							<IconButton
								icon="star-circle"
								onPress={() =>
									liked ? onLike(post.id, currentProfileId) : onUnlike(post.id, currentProfileId)
								}
								size={actionButtonSize}
								style={styles.actionButton}
							/>
							<IconButton
								icon="share"
								onPress={() => {}}
								size={actionButtonSize}
								style={styles.actionButton}
							/>
						</View>
					</View>
				</View>
			</View>
		</TouchableHighlight>
	);
};