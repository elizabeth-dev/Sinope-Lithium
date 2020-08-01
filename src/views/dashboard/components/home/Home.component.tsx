import { TimelineActions } from '@core/actions/timeline.actions';
import { fromProfile } from '@core/selectors/profile.selectors';
import { fromTimeline } from '@core/selectors/timeline.selectors';
import { PostList } from '@shared/components/post-list/PostList.component';
import { useAppDispatch } from '@shared/hooks/use-shallow-selector/useAppDispatch.hook';
import { composeScreenLayer } from '@shared/navigation/layers/compose-screen.layer';
import React from 'react';
import { Navigation } from 'react-native-navigation';
import { FAB } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { HomeStyles as styles } from './Home.styles';

export interface HomeProps {
	stackId: string;
}

export const Home: React.FC<HomeProps> = React.memo(({ stackId }) => {
	const dispatcher = useAppDispatch();

	const currentProfile = useSelector(fromProfile.currentId);
	const timeline = useSelector(fromTimeline.current);

	const onRefresh = () => {
		dispatcher(TimelineActions.request(currentProfile));
	};

	if (!timeline) onRefresh();

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
			<FAB style={styles.fab} icon="message-reply" onPress={onCompose} />
		</>
	);
});
