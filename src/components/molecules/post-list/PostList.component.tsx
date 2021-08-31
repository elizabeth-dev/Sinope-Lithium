import { Divider } from '@atoms/divider/Divider.component';
import { SlimPost } from '@molecules/slim-post/SlimPost.component';
import { FullPost } from '@shared/types/entities/post.interface';
import React from 'react';
import { Animated, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

interface PostListProps {
	posts: FullPost[];
	currentProfile: string;
	onRefresh?: () => void;
	refreshing?: boolean;
	header?: React.ReactElement;
	onScroll?: (ev: NativeSyntheticEvent<NativeScrollEvent>) => void;
	containerPaddingTop?: number;
	progressViewOffset?: number;
	onPostNav: (postId: string) => void;
	onProfileNav: (profileId: string) => void;
	onReplyNav: (postId: string) => void;
	onLike: (postId: string) => void;
	onUnlike: (postId: string) => void;
}

export const PostList: React.FC<PostListProps> = React.memo((props) => (
	<Animated.FlatList // FIXME: Why is this animated?
		ListHeaderComponent={props.header}
		data={props.posts}
		extraData={props.currentProfile} // TODO: Check if callbacks shoud be in here
		renderItem={(el) => (
			<SlimPost
				post={el.item}
				currentProfileId={props.currentProfile}
				onPostNav={props.onPostNav}
				onProfileNav={props.onProfileNav}
				onReplyNav={props.onReplyNav}
				onLike={props.onLike}
				onUnlike={props.onUnlike}
			/>
		)}
		keyExtractor={(item) => item.id}
		showsVerticalScrollIndicator={false}
		ItemSeparatorComponent={Divider}
		onRefresh={props.onRefresh}
		refreshing={props.refreshing}
		onScroll={props.onScroll}
		contentContainerStyle={{ paddingTop: props.containerPaddingTop }}
		progressViewOffset={props.progressViewOffset}
	/>
));
