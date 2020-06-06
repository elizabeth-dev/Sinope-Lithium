import { SlimPost } from '@shared/components/slim-post/SlimPost.component';
import { IPost } from '@shared/types/post.interface';
import React from 'react';
import { FlatList } from 'react-native';
import { Divider } from 'react-native-paper';

interface PostListProps {
	posts: IPost[];
	onRefresh: () => void;
	refreshing: boolean;
	header?: React.ReactElement;
	stackId: string;
}

const keyExtractor = (item: IPost) => item.id;

export const PostList: React.FC<PostListProps> = (props) => {
	// TODO: Move renderItem function outside render
	return (
		<FlatList
			ListHeaderComponent={ props.header }
			data={ props.posts }
			extraData={ props.stackId }
			renderItem={ ({ item }) => <SlimPost stackId={ props.stackId } post={ item } /> }
			keyExtractor={ keyExtractor }
			showsVerticalScrollIndicator={ false }
			ItemSeparatorComponent={ Divider }
			onRefresh={ props.onRefresh }
			refreshing={ props.refreshing }
			removeClippedSubviews={ true }
		/>
	);
};
