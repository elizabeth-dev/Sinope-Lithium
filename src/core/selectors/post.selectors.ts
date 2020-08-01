import { AppState } from '@core/app.store';
import { createSelector } from '@reduxjs/toolkit';
import { FullPostEntity } from '@shared/types/entities/post.interface';
import { FetchEntity } from '@shared/types/fetchFields.interface';
import { populatePostEntity } from '@shared/helper/post.helper';

const selectPostsState = (state: AppState) => state.post.postsById;

const selectPostsByProfileState = (state: AppState) =>
	state.post.postsByProfile;

const selectPostById = () =>
	createSelector(
		(state: AppState, id: string) => state.post.postsById[id],
		(state: AppState) => state.profile.profilesById,
		populatePostEntity,
	);

const selectPostsByProfile = () =>
	createSelector(
		(state: AppState, profile: string) =>
			selectPostsByProfileState(state)[profile],

		selectPostsState,
		(state: AppState) => state.profile.profilesById,
		(
			profilePosts,
			postsById,
			profilesById,
		): FetchEntity<'posts', FullPostEntity[]> => ({
			...profilePosts,
			posts: profilePosts?.posts?.map((id) =>
				populatePostEntity(postsById[id], profilesById),
			),
		}),
	);

export const fromPost = {
	make: { byId: selectPostById, byProfile: selectPostsByProfile },
};
