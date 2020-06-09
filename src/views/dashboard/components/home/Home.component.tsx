import { mockedPosts } from '@core/mocks/post/commonPosts.mock';
import { PostList } from '@shared/components/post-list/PostList.component';
import React from 'react';
import { ToastAndroid } from 'react-native';
import { FAB } from 'react-native-paper';
import { HomeStyles as styles } from './Home.styles';

export interface HomeProps {
	stackId: string;
}

export const Home: React.FC<HomeProps> = React.memo(({ stackId }) => {
	const [refreshing, setRefreshing] = React.useState(false);

	const onRefresh = () => {
		setRefreshing(true);
		ToastAndroid.show('Refreshing...', ToastAndroid.SHORT);
		setTimeout(() => setRefreshing(false), 3000);
	};

	return (
		<>
			<PostList posts={mockedPosts} onRefresh={onRefresh} refreshing={refreshing} stackId={stackId} />
			<FAB
				style={styles.fab}
				icon="message-reply"
				onPress={() => ToastAndroid.show('Pressed!', ToastAndroid.SHORT)}
			/>
		</>
	);
});
