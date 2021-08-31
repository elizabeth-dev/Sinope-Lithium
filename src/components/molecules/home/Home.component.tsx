import { Fab } from '@atoms/fab/Fab.component';
import { PostList } from '@molecules/post-list/PostList.component';
import { FullPost } from '@shared/types/entities/post.interface';
import React from 'react';
import { HomeStyles as styles } from './Home.styles';

export interface HomeProps {
	currentProfileId: string;
	timeline: FullPost[];
	timelineFetching: boolean;
	componentId: string;
	onTimelineRefresh: (profileId: string) => void;
	onComposeNav: (componentId: string) => void;
	onPostNav: (postId: string, componentId: string) => void;
	onProfileNav: (profileId: string, componentId: string) => void;
	onReplyNav: (postId: string, componentId: string) => void;
	onLike: (postId: string, profileId: string) => void;
	onUnlike: (postId: string, profileId: string) => void;
}

export const Home: React.FC<HomeProps> = React.memo(
	({
		currentProfileId,
		timeline,
		timelineFetching,
		componentId,
		onTimelineRefresh,
		onComposeNav,
		onPostNav,
		onProfileNav,
		onReplyNav,
		onLike,
		onUnlike,
		// TODO: [SLI-29] Check substitution with react-native-navigation FAB
	}) => (
		<>
			<PostList
				currentProfile={currentProfileId}
				posts={timeline}
				onRefresh={() => onTimelineRefresh(currentProfileId)}
				refreshing={timelineFetching}
				componentId={componentId}
				onPostNav={onPostNav}
				onProfileNav={onProfileNav}
				onReplyNav={onReplyNav}
				onLike={onLike}
				onUnlike={onUnlike}
			/>
			<Fab style={styles.fab} icon="message-reply" onPress={() => onComposeNav(componentId)} />
		</>
	),
);
