import { PostActions } from '@actions/post.actions';
import { QuestionActions } from '@actions/question.actions';
import { SearchActions } from '@actions/search.actions';
import { TimelineActions } from '@actions/timeline.actions';
import { fromProfile } from '@core/state/selectors/profile.selectors';
import { fromQuestion } from '@core/state/selectors/question.selectors';
import { fromSearch } from '@core/state/selectors/search.selectors';
import { fromTimeline } from '@core/state/selectors/timeline.selectors';
import { DashboardScreen } from '@screens/dashboard/DashboardScreen.component';
import { nav } from '@shared/helper/navigation.helper';
import { useAppDispatch } from '@shared/hooks/use-shallow-selector/useAppDispatch.hook';
import { composeScreenLayer } from '@shared/navigation/layers/compose-screen.layer';
import { searchScreenLayer } from '@shared/navigation/layers/search-screen.layer';
import React from 'react';
import {
	Navigation,
	NavigationButtonPressedEvent,
	NavigationComponentListener,
	NavigationFunctionComponent,
} from 'react-native-navigation';
import { useSelector } from 'react-redux';

export const DashboardView: NavigationFunctionComponent = ({ componentId }) => {
	const dispatcher = useAppDispatch();

	const currentProfileId = useSelector(fromProfile.currentId);
	const timelineEntity = useSelector(fromTimeline.current);
	const receivedQuestions = useSelector(fromQuestion.received);
	const searchHistory = useSelector(fromSearch.history);

	const onTimelineRefresh = React.useCallback(() => {
		dispatcher(TimelineActions.request({ profile: currentProfileId }));
	}, [dispatcher, currentProfileId]);

	const onQuestionsRefresh = React.useCallback(() => {
		dispatcher(QuestionActions.getByProfile({ profile: currentProfileId }));
	}, [dispatcher, currentProfileId]);

	const onSearch = (searchTerm: string) => {
		dispatcher(SearchActions.search({ searchTerm }));
		Navigation.push(componentId, searchScreenLayer(searchTerm));
	};

	const onRemoveSearch = (searchTerm: string) => {
		dispatcher(SearchActions.remove({ searchTerm }));
	};

	const onProfileNav = (profileId: string) => nav.toProfile(profileId, componentId);
	const onPostNav = (postId: string) => nav.toPost(postId, componentId);
	const onReplyNav = (postId: string) => nav.toReply(postId, componentId);
	const onComposeNav = () => nav.toCompose(componentId);

	const onLike = (postId: string) => dispatcher(PostActions.like({ post: postId, fromProfile: currentProfileId }));

	const onUnlike = (postId: string) =>
		dispatcher(PostActions.unlike({ post: postId, fromProfile: currentProfileId }));

	const onQuestionAnswer = (questionId: string) =>
		Navigation.push(componentId, composeScreenLayer(undefined, questionId));

	React.useEffect(() => {
		if (!timelineEntity.timeline) {
			onTimelineRefresh();
		}
	}, [onTimelineRefresh, timelineEntity.timeline]);

	React.useEffect(() => {
		// TODO: Check if this can be moved to a hook
		const listener: NavigationComponentListener = {
			navigationButtonPressed: (event: NavigationButtonPressedEvent) => {
				if (event.buttonId === 'DASHBOARD_MENU') {
					Navigation.mergeOptions(componentId, {
						sideMenu: { left: { visible: true } },
					});
				}
			},
		};

		const subscription = Navigation.events().registerComponentListener(listener, componentId);
		return () => {
			subscription.remove();
		};
	}, [componentId]);

	return (
		<DashboardScreen
			currentProfileId={currentProfileId}
			timeline={timelineEntity.timeline}
			timelineFetching={timelineEntity.isFetching}
			onTimelineRefresh={onTimelineRefresh}
			questions={receivedQuestions.questions.map((question) => question.question)}
			fetchingQuestions={receivedQuestions.isFetching}
			onQuestionsRefresh={onQuestionsRefresh}
			searchHistory={searchHistory}
			onSearch={onSearch}
			onRemoveSearch={onRemoveSearch}
			onComposeNav={onComposeNav}
			onProfileNav={onProfileNav}
			onPostNav={onPostNav}
			onReplyNav={onReplyNav}
			onLike={onLike}
			onUnlike={onUnlike}
			onQuestionAnswer={onQuestionAnswer}
		/>
	);
};
