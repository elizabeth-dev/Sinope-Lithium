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
	stackId: string;
	onScroll?: (ev: NativeSyntheticEvent<NativeScrollEvent>) => void;
	containerPaddingTop?: number;
	progressViewOffset?: number;
}

export const PostList: React.FC<PostListProps> = React.memo((props) => (
	<Animated.FlatList
		ListHeaderComponent={props.header}
		data={props.posts}
		extraData={`${props.stackId}/${[props.currentProfile]}`}
		renderItem={(el) => <SlimPost stackId={props.stackId} post={el.item} currentProfile={props.currentProfile} />}
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
