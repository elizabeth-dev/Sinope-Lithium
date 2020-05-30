import { SlimPost } from '@shared/components/slim-post/SlimPost.component';
import { IPost } from '@shared/types/post.interface';
import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { Divider } from 'react-native-paper';

interface PostListProps {
	posts: IPost[];
	onRefresh: () => void;
	refreshing: boolean
}

export const PostList: React.FC<PostListProps> = (props) => {
	return (
		<FlatList
			data={ props.posts }
			renderItem={ ({ item }) => <SlimPost post={ item } /> }
			keyExtractor={ (item) => item.id }
			showsVerticalScrollIndicator={ false }
			ItemSeparatorComponent={ Divider }
			onRefresh={ props.onRefresh }
			refreshing={ props.refreshing }
		/>
	);
};
