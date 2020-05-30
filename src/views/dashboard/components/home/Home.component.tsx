import { mockedPosts } from '@core/mocks/post/commonPosts.mock';
import { PostList } from '@shared/components/post-list/PostList.component';
import React from 'react';

export const Home: React.FC = () => {
	const [ refreshing, setRefreshing ] = React.useState(false);
	const onRefresh = () => {
		setRefreshing(true);
		console.log('Refreshed');
		setTimeout(() => setRefreshing(false), 3000);
	};
	return (
		<PostList posts={ mockedPosts } onRefresh={ onRefresh } refreshing={ refreshing } />
	);
};
