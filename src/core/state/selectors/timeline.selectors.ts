import { AppState } from '@core/state/app.store';
import { createSelector } from '@reduxjs/toolkit';
import { FetchEntity } from '@shared/types/fetchFields.interface';
import { FullPost } from '@shared/types/entities/post.interface';
import { populatePost } from '@shared/helper/post.helper';

const selectCurrentRawTimeline = (state: AppState) =>
	state.currentData.timeline[state.self.currentProfile];

const selectCurrentTimeline = createSelector(
	selectCurrentRawTimeline,
	(state: AppState) => state.currentData.post.postsById,
	(state: AppState) => state.currentData.profile.profilesById,
	(timeline, postsById, profilesById): FetchEntity<'timeline', FullPost[]> =>
		timeline && {
			...timeline,
			timeline: timeline?.timeline
				?.map((postId) => postsById[postId]?.post)
				?.map((post) => populatePost(post, profilesById)),
		},
);

export const fromTimeline = {
	current: selectCurrentTimeline,
};
