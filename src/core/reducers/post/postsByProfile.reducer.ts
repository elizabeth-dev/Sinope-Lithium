import {
	RequestProfilePostsAction,
	ReceiveProfilePostsAction,
	SentPostAction,
	PostActions,
} from '@core/actions/post.actions';
import { FetchFields } from '@shared/types/fetchFields.interface';
import { mockedPosts } from '@core/mocks/post/commonPosts.mock';

export type PostsByProfileState = {
	[profileId: string]: { posts: string[] } & FetchFields;
};

const initialState: PostsByProfileState = mockedPosts.reduce(
	(acc, post) =>
		Object.assign(acc, {
			isFetching: false,
			receivedAt: Date.now(),
			[post.author]: { posts: [...acc[post.author].posts, post.id] },
		}),
	{} as PostsByProfileState,
);

export function postsByProfileReducer(state = initialState, action: PostActions): PostsByProfileState {
	switch (action.type) {
		case RequestProfilePostsAction:
			return {
				...state,
				[action.payload.profile]: { ...state[action.payload.profile], isFetching: true },
			};
		case ReceiveProfilePostsAction:
			return {
				...state,
				[action.payload.profile]: {
					...state[action.payload.profile],
					posts: action.payload.posts.map((post) => post.id),
					receivedAt: action.payload.receivedAt,
					isFetching: false,
				},
			};
		case SentPostAction:
			return {
				...state,
				[action.payload.post.author]: {
					...state[action.payload.post.author],
					posts: [action.payload.post.id, ...state[action.payload.post.author].posts],
				},
			};
		default:
			return state;
	}
}
