import { AppState } from '@core/state/app.store';
import { createSelector } from '@reduxjs/toolkit';
import { FullPostEntity } from '@shared/types/entities/post.interface';
import { FetchEntity } from '@shared/types/fetchFields.interface';
import { populatePostEntity } from '@shared/helper/post.helper';

const selectPostsState = (state: AppState) => state.currentData.post.postsById;

const selectPostsByProfileState = (state: AppState) =>
	state.currentData.post.postsByProfile;

const selectPostById = () =>
	createSelector(
		(state: AppState, id: string) => state.currentData.post.postsById[id],
		(state: AppState) => state.currentData.profile.profilesById,
		populatePostEntity,
	);

const selectPostsByProfile = () =>
	createSelector(
		(state: AppState, profile: string) =>
			selectPostsByProfileState(state)[profile],

		selectPostsState,
		(state: AppState) => state.currentData.profile.profilesById,
		(
			profilePosts,
			postsById,
			profilesById,
		): FetchEntity<'posts', FullPostEntity[]> =>
			profilePosts && {
				...profilePosts,
				// FIX: Will return undefined if post is false
				posts: profilePosts?.posts?.map((id) =>
					populatePostEntity(postsById[id], profilesById),
				),
			},
	);

export const fromPost = {
	make: { byId: selectPostById, byProfile: selectPostsByProfile },
};