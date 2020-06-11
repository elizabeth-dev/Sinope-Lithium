import { SendPostAction, SentPostAction, FailedSentPostAction, PostActions } from '@core/actions/post.actions';
import { INewPost } from '@shared/types/entities/post.interface';

export type PendingPostsState = INewPost[];

const initialState: PendingPostsState = [];

export function pendingPostsReducer(state = initialState, action: PostActions): PendingPostsState {
	switch (action.type) {
		case SendPostAction:
			return [action.payload.newPost, ...state];
		case SentPostAction:
		case FailedSentPostAction:
			return [...state.filter((pPost) => pPost.tmpId !== action.payload.tmpId)];
		default:
			return state;
	}
}
