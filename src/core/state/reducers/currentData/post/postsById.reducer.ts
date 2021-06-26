import {
	PostActionsDto,
	ReceivePostsAction,
	ReceiveProfilePostsAction,
	RequestPostAction,
	SentPostAction,
} from '@actions/post.actions';
import { IReceiveTimelineAction, ReceiveTimelineAction } from '@actions/timeline.actions';
import { PostEntity } from '@shared/types/entities/post.interface';
import { IReceiveSearchAction, ReceiveSearchAction } from '@actions/search.actions';

export type PostsByIdState = {
	[id: string]: PostEntity;
};

const initialState: PostsByIdState = {};

export function postsByIdReducer(
	state = initialState,
	action: PostActionsDto | IReceiveTimelineAction | IReceiveSearchAction,
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
		case ReceiveProfilePostsAction:
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
		case ReceivePostsAction:
		case ReceiveTimelineAction:
		case ReceiveSearchAction:
			return {
				...state,
				...action.payload.posts.reduce(
					(acc, post) => ({
						...acc,
						[post.id]: {
							post: {
								...post,
								profile: post.profile,
								question: post.question,
							},
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
					post: {
						...action.payload.post,
						profile: action.payload.post.profile,
						question: action.payload.post.question,
					},
					receivedAt: action.payload.receivedAt,
					isFetching: false,
				},
			};
		default:
			return state;
	}
}
