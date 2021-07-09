import { TimelineActions } from '@actions/timeline.actions';
import { Fab } from '@atoms/fab/Fab.component';
import { fromProfile } from '@core/state/selectors/profile.selectors';
import { fromTimeline } from '@core/state/selectors/timeline.selectors';
import { PostList } from '@molecules/post-list/PostList.component';
import { useAppDispatch } from '@shared/hooks/use-shallow-selector/useAppDispatch.hook';
import { composeScreenLayer } from '@shared/navigation/layers/compose-screen.layer';
import React from 'react';
import { Navigation } from 'react-native-navigation';
import { useSelector } from 'react-redux';
import { HomeStyles as styles } from './Home.styles';

export interface HomeProps {
	stackId: string;
}

export const Home: React.FC<HomeProps> = React.memo(({ stackId }) => {
	const dispatcher = useAppDispatch();

	const currentProfile = useSelector(fromProfile.currentId);
	const timeline = useSelector(fromTimeline.current);

	const onRefresh = React.useCallback(() => {
		dispatcher(TimelineActions.request({ profile: currentProfile }));
	}, [currentProfile, dispatcher]);

	React.useEffect(() => {
		if (!timeline) {
			onRefresh();
		}
	}, [onRefresh, timeline]);

	const onCompose = () => Navigation.push(stackId, composeScreenLayer());

	// TODO: [SLI-29] Check substitution with react-native-navigation FAB
	return (
		<>
			<PostList
				currentProfile={currentProfile}
				posts={timeline?.timeline || []}
				onRefresh={onRefresh}
				refreshing={timeline?.isFetching ?? true}
				stackId={stackId}
			/>
			<Fab style={styles.fab} icon="message-reply" onPress={onCompose} />
		</>
	);
});
