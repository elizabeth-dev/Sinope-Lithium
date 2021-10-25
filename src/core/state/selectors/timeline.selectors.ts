import { AppState } from '@core/state/app.store';
import { createSelector } from '@reduxjs/toolkit';
import { populatePost } from '@shared/helper/post.helper';
import { FullPost } from '@shared/types/entities/post.interface';
import { FetchEntity } from '@shared/types/fetchFields.interface';
import { fromPost } from './post.selectors';
import { fromProfile } from './profile.selectors';
import { fromQuestion } from './question.selectors';

const selectCurrentRawTimeline = (state: AppState) => state.currentData.timeline[state.self.currentProfile];

const selectCurrentTimeline = createSelector(
	selectCurrentRawTimeline,
	fromPost.state.byId,
	fromProfile.state.byId,
	fromQuestion.state.byId,
	(timeline, postsById, profilesById, questionsById): FetchEntity<'timeline', FullPost[]> | undefined =>
		timeline && {
			...timeline,
			timeline: timeline.timeline?.map((postId) =>
				populatePost(postsById[postId]?.post, profilesById, questionsById),
			),
		},
);

export const fromTimeline = {
	current: selectCurrentTimeline,
};
