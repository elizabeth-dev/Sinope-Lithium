import { TimelineActions } from '@core/actions/timeline.actions';
import { AppState } from '@core/app.store';
import { PostList } from '@shared/components/post-list/PostList.component';
import { composeScreenLayer } from '@shared/navigation/layers/compose-screen.layer';
import React from 'react';
import { Navigation } from 'react-native-navigation';
import { FAB } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { HomeStyles as styles } from './Home.styles';

export interface HomeProps {
	stackId: string;
}

export const Home: React.FC<HomeProps> = React.memo(({ stackId }) => {
	const dispatcher = useDispatch();
	const { timeline, profile } = useSelector((state: AppState) => ({
		timeline: state.timeline.timelineByProfile[state.profile.self.current],
		profile: state.profile.self.current,
	}));

	if (!timeline) dispatcher(TimelineActions.request(profile));

	const posts = useSelector((state: AppState) =>
		timeline?.timeline?.map((postId) => ({
			...state.post.postsById[postId]?.post,
			// TODO: Profile may be inexistent
			profile:
				state.profile.profilesById[
					state.post.postsById[postId].post.profile
				]?.profile,
		})),
	);

	const onRefresh = () => {
		dispatcher(TimelineActions.request(profile));
	};

	const onCompose = () => Navigation.push(stackId, composeScreenLayer());

	// TODO: [SLI-29] Check substitution with react-native-navigation FAB
	return (
		<>
			<PostList
				posts={posts || []}
				onRefresh={onRefresh}
				refreshing={timeline ? timeline.isFetching : true}
				stackId={stackId}
			/>
			<FAB style={styles.fab} icon="message-reply" onPress={onCompose} />
		</>
	);
});
