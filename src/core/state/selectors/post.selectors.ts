import { AppState } from '@core/state/app.store';
import { createSelector } from '@reduxjs/toolkit';
import { FullPostEntity } from '@shared/types/entities/post.interface';
import { FetchEntity } from '@shared/types/fetchFields.interface';
import { populatePostEntity } from '@shared/helper/post.helper';
import { fromProfile } from './profile.selectors';
import { fromQuestion } from './question.selectors';

const selectPostsByIdState = (state: AppState) => state.currentData.post.postsById;

const selectPostById = () =>
	createSelector(
		(state: AppState, id: string) => state.currentData.post.postsById[id],
		fromProfile.state.byId,
		fromQuestion.state.byId,
		populatePostEntity,
	);

const selectPostsByProfile = () =>
	createSelector(
		(state: AppState, profile: string) => state.currentData.post.postsByProfile[profile],
		fromPost.state.byId,
		fromProfile.state.byId,
		fromQuestion.state.byId,
		(profilePosts, postsById, profilesById, questionsById): FetchEntity<'posts', FullPostEntity[]> =>
			profilePosts && {
				...profilePosts, // FIX: Will return undefined if post is false
				posts: profilePosts?.posts?.map((id) => populatePostEntity(postsById[id], profilesById, questionsById)),
			},
	);

export const fromPost = {
	make: {
		byId: selectPostById,
		byProfile: selectPostsByProfile,
	},
	state: {
		byId: selectPostsByIdState,
	},
};
