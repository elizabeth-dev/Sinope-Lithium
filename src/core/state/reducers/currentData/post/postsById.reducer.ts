import {
	PostActionsDto,
	ReceivePostsAction,
	ReceiveProfilePostsAction,
	RequestPostAction,
	SentPostAction,
} from '@core/state/actions/post.actions';
import {
	IReceiveTimelineAction, ReceiveTimelineAction,
} from '@core/state/actions/timeline.actions';
import { PostEntity } from '@shared/types/entities/post.interface';
import { IReceiveSearchAction, ReceiveSearchAction } from '@core/state/actions/search.actions';

export type PostsByIdState = {
	[id: string]: PostEntity;
};

const initialState: PostsByIdState = {};

export function postsByIdReducer(
	state = initialState,
	action: PostActionsDto | IReceiveTimelineAction | IReceiveSearchAction): PostsByIdState {
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
		case ReceiveSearchAction:
			return {
				...state, ...action.payload.posts.reduce((acc, post) => ({
					...acc,
					[post.id]: {
						post,
						isFetching: false,
						receivedAt: action.payload.receivedAt,
					},
				}), {} as PostsByIdState),
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
