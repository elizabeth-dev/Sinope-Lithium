import { AppScreens } from '@core/app.screens';
import { PostList } from '@shared/components/post-list/PostList.component';
import { Post } from '@shared/components/post/Post.component';
import { IPost } from '@shared/types/post.interface';
import React from 'react';
import { ToastAndroid } from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { Navigation } from 'react-native-navigation';
import { Divider } from 'react-native-paper';

export interface PostScreenProps {
	post: IPost;
	replies: IPost[];
	stackId: string;
}

export const PostScreen: React.FC<PostScreenProps> = ({ post, replies, stackId }) => {
	const [ refreshing, setRefreshing ] = React.useState(false);

	const onRefresh = () => {
		setRefreshing(true);
		ToastAndroid.show('Refreshing...', ToastAndroid.SHORT);
		setTimeout(() => setRefreshing(false), 2000);
	};
	return (

		<PostList
			header={ <><Post post={ post } /><Divider /></> }
			posts={ replies }
			onRefresh={ onRefresh }
			refreshing={ refreshing }
			stackId={ stackId }
		/>
	);
};

Navigation.registerComponent(AppScreens.PostScreen, () => gestureHandlerRootHOC(PostScreen));
