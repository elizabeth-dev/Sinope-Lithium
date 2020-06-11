import {
	PostActions,
	RequestPostAction,
	ReceivePostsAction,
	ReceiveProfilePostsAction,
	SentPostAction,
} from '@core/actions/post.actions';
import { IPost } from '@shared/types/entities/post.interface';
import { FetchFields } from '@shared/types/fetchFields.interface';
import { mockedPosts } from '@core/mocks/post/commonPosts.mock';

export type PostsByIdState = {
	[id: string]: { post: IPost } & FetchFields;
};

const initialState: PostsByIdState = mockedPosts.reduce(
	(acc, post) => Object.assign(acc, { [post.id]: { post, isFetching: false, receivedAt: Date.now() } }),
	{} as PostsByIdState,
);

export function postsByIdReducer(state = initialState, action: PostActions): PostsByIdState {
	switch (action.type) {
		case RequestPostAction:
			return {
				...state,
				[action.payload.post]: { ...state[action.payload.post], isFetching: true },
			};
		case ReceivePostsAction:
		case ReceiveProfilePostsAction:
			return {
				...state,
				...action.payload.posts.reduce(
					(acc, post) => ({
						...acc,
						[post.id]: { post, isFetching: false, receivedAt: action.payload.receivedAt },
					}),
					{} as PostsByIdState,
				),
			};
		case SentPostAction:
			return {
				...state,
				[action.payload.post.id]: {
					post: action.payload.post,
					receivedAt: action.payload.receivedAt,
					isFetching: false,
				},
			};
		default:
			return state;
	}
}
