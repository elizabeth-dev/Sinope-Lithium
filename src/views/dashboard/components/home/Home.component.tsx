import { mockedPosts } from '@core/mocks/post/commonPosts.mock';
import { PostList } from '@shared/components/post-list/PostList.component';
import { composeScreenLayer } from '@shared/navigation/layers/compose-screen.layer';
import React from 'react';
import { ToastAndroid } from 'react-native';
import { Navigation } from 'react-native-navigation';
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

	const onCompose = () => {
		Navigation.push(stackId, composeScreenLayer());
	};

	// TODO: [SLI-29] Check substitution with react-native-navigation FAB
	return (
		<>
			<PostList posts={mockedPosts} onRefresh={onRefresh} refreshing={refreshing} stackId={stackId} />
			<FAB style={styles.fab} icon="message-reply" onPress={onCompose} />
		</>
	);
});
