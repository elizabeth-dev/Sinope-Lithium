import { PostActions } from '@core/actions/post.actions';
import { Post } from '@shared/types/post.interface';

export interface PostState {
	postsById: { [id: string]: Post };
}

const initialState: PostState = {
	postsById: {},
};

export function postReducer(
	state = initialState,
	action: PostActions,
): PostState {
	switch (action.type) {
		default:
			return state;
	}
}
