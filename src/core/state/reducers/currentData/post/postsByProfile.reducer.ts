import {
	PostActionsDto,
	ReceiveProfilePostsAction,
	RequestProfilePostsAction,
	SentPostAction,
} from '@core/state/actions/post.actions';
import { FetchEntity } from '@shared/types/fetchFields.interface';

export type PostsByProfileState = {
	[profileId: string]: FetchEntity<'posts', string[]>;
};

const initialState: PostsByProfileState = {};

export function postsByProfileReducer(
	state = initialState,
	action: PostActionsDto,
): PostsByProfileState {
	switch (action.type) {
		case RequestProfilePostsAction:
			return {
				...state,
				[action.payload.profile]: {
					...state[action.payload.profile],
					isFetching: true,
				},
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
				[action.payload.post.profile.id]: {
					...state[action.payload.post.profile.id],
					posts: [
						action.payload.post.id,
						...(state[action.payload.post.profile.id]
							? state[action.payload.post.profile.id].posts
							: []),
					],
				},
			};
		default:
			return state;
	}
}
