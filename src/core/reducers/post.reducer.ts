import { combineReducers } from 'redux';
import { pendingPostsReducer } from './post/pendingPosts.reducer';
import { postsByIdReducer } from './post/postsById.reducer';
import { postsByProfileReducer } from './post/postsByProfile.reducer';

export type PostState = ReturnType<typeof postReducer>;

export const postReducer = combineReducers({
	postsById: postsByIdReducer,
	postsByProfile: postsByProfileReducer,
	pendingPosts: pendingPostsReducer,
});
