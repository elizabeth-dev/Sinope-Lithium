import { SlimPost } from '@shared/components/slim-post/SlimPost.component';
import { IPost } from '@shared/types/post.interface';
import React from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, Animated } from 'react-native';
import { Divider } from 'react-native-paper';

interface PostListProps {
	posts: IPost[];
	onRefresh: () => void;
	refreshing: boolean;
	header?: React.ReactElement;
	stackId: string;
	onScroll?: (ev: NativeSyntheticEvent<NativeScrollEvent>) => void;
	containerPaddingTop?: number;
}

export const PostList: React.FC<PostListProps> = (props) => {
	return (
		<Animated.FlatList
			ListHeaderComponent={props.header}
			data={props.posts}
			extraData={props.stackId}
			renderItem={({ item }: { item: IPost }) => <SlimPost stackId={props.stackId} post={item} />}
			keyExtractor={(item: IPost) => item.id}
			showsVerticalScrollIndicator={false}
			ItemSeparatorComponent={Divider}
			onRefresh={props.onRefresh}
			refreshing={props.refreshing}
			onScroll={props.onScroll}
			contentContainerStyle={{ paddingTop: props.containerPaddingTop }}
		/>
	);
};
