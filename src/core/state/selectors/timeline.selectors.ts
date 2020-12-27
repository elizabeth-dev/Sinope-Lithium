import { AppState } from '@core/state/app.store';
import { createSelector } from '@reduxjs/toolkit';
import { FetchEntity } from '@shared/types/fetchFields.interface';
import { FullPost } from '@shared/types/entities/post.interface';
import { populatePost } from '@shared/helper/post.helper';
import { fromPost } from './post.selectors';
import { fromProfile } from './profile.selectors';
import { fromQuestion } from './question.selectors';

const selectCurrentRawTimeline = (state: AppState) => state.currentData.timeline[state.self.currentProfile];

const selectCurrentTimeline = createSelector(
	selectCurrentRawTimeline,
	fromPost.state.byId,
	fromProfile.state.byId,
	fromQuestion.state.byId,
	(timeline, postsById, profilesById, questionsById): FetchEntity<'timeline', FullPost[]> => timeline && {
		...timeline,
		timeline: timeline?.timeline
			?.map((postId) => postsById[postId]?.post)
			?.map((post) => populatePost(post, profilesById, questionsById)),
	},
);

export const fromTimeline = {
	current: selectCurrentTimeline,
};
