import { combineReducers } from 'redux';
import { pendingPostsReducer, PendingPostsState } from './post/pendingPosts.reducer';
import { postsByIdReducer, PostsByIdState } from './post/postsById.reducer';
import { postsByProfileReducer, PostsByProfileState } from './post/postsByProfile.reducer';

export interface PostState {
	postsById: PostsByIdState;
	postsByProfile: PostsByProfileState;
	pendingPosts: PendingPostsState;
}

export const postReducer = combineReducers<PostState>({
	postsById: postsByIdReducer,
	postsByProfile: postsByProfileReducer,
	pendingPosts: pendingPostsReducer,
});
