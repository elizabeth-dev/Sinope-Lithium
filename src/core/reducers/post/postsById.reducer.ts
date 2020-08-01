import {
	PostActionsDto,
	ReceivePostsAction,
	ReceiveProfilePostsAction,
	RequestPostAction,
	SentPostAction,
} from '@core/actions/post.actions';
import {
	IReceiveTimelineAction,
	ReceiveTimelineAction,
} from '@core/actions/timeline.actions';
import { PostEntity } from '@shared/types/entities/post.interface';

export type PostsByIdState = {
	[id: string]: PostEntity;
};

const initialState: PostsByIdState = {};

export function postsByIdReducer(
	state = initialState,
	action: PostActionsDto | IReceiveTimelineAction,
): PostsByIdState {
	switch (action.type) {
		case RequestPostAction:
			return {
				...state,
				[action.payload.post]: {
					...state[action.payload.post],
					isFetching: true,
				},
			};
		case ReceivePostsAction:
		case ReceiveProfilePostsAction:
		case ReceiveTimelineAction:
			return {
				...state,
				...action.payload.posts.reduce(
					(acc, post) => ({
						...acc,
						[post.id]: {
							post,
							isFetching: false,
							receivedAt: action.payload.receivedAt,
						},
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
