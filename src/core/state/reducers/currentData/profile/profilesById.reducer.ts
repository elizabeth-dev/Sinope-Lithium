import {
	CreatedFirstProfileAction,
	CreatedProfileAction,
	FollowedProfileAction,
	ProfileActionsDto,
	ReceiveProfilesAction,
	RequestProfileAction,
	UnfollowedProfileAction,
} from '@core/state/actions/profile.actions';
import { IReceiveSelfUserAction, ReceiveSelfUserAction } from '@core/state/actions/user.actions';
import { ProfileEntity } from '@shared/types/entities/profile.interface';
import { IReceiveSearchAction, ReceiveSearchAction } from '../../../actions/search.actions';
import {
	IReceivePostsAction, IReceiveProfilePostsAction, ReceivePostsAction,
} from '../../../actions/post.actions';
import { IReceiveTimelineAction, ReceiveTimelineAction } from '../../../actions/timeline.actions';

export interface ProfilesByIdState {
	[id: string]: ProfileEntity;
}

const initialState: ProfilesByIdState = {};

export function profilesByIdReducer(
	state = initialState,
	action: ProfileActionsDto | IReceiveSelfUserAction | IReceiveSearchAction | IReceivePostsAction | IReceiveProfilePostsAction | IReceiveTimelineAction): ProfilesByIdState {
	switch (action.type) {
		case RequestProfileAction:
			return {
				...state,
				[action.payload.profile]: {
					...state[action.payload.profile],
					isFetching: true,
				},
			};
		case ReceiveProfilesAction:
			return {
				...state, ...action.payload.profiles.reduce((acc, profile) => ({
					...acc,
					[profile.id]: {
						profile,
						isFetching: false,
						receivedAt: action.payload.receivedAt,
					},
				}), {} as ProfilesByIdState),
			};
		case ReceiveSearchAction:
			return {
				...state, ...action.payload.profiles.reduce((acc, profile) => ({
					...acc,
					[profile.id]: {
						profile,
						isFetching: false,
						receivedAt: action.payload.receivedAt,
					},
				}), {} as ProfilesByIdState), ...action.payload.posts.reduce((acc, post) => ({
					...acc,
					[post.profile.id]: {
						profile: post.profile,
						isFetching: false,
						receivedAt: action.payload.receivedAt,
					},
				}), {} as ProfilesByIdState),
			};
		case ReceiveTimelineAction:
		case ReceivePostsAction:
			return {
				...state, ...action.payload.posts.reduce((acc, post) => ({
					...acc,
					[post.profile.id]: {
						profile: post.profile,
						isFetching: false,
						receivedAt: action.payload.receivedAt,
					},
				}), {} as ProfilesByIdState),
			};
		case ReceiveSelfUserAction:
			return {
				...state, ...action.payload.user.profiles.reduce((acc, profile) => ({
					...acc,
					[profile.id]: {
						profile,
						isFetching: false,
						receivedAt: action.payload.receivedAt,
					},
				}), {} as ProfilesByIdState),
			};
		case CreatedProfileAction:
		case CreatedFirstProfileAction:
			return {
				...state,
				[action.payload.profile.id]: {
					profile: action.payload.profile,
					isFetching: false,
					receivedAt: action.payload.receivedAt,
				},
			};
		case FollowedProfileAction:
			return {
				...state,
				[action.payload.toProfile]: {
					...state[action.payload.toProfile],
					profile: {
						...state[action.payload.toProfile].profile,
						followingThem: true,
					},
				},
			};
		case UnfollowedProfileAction:
			return {
				...state,
				[action.payload.toProfile]: {
					...state[action.payload.toProfile],
					profile: {
						...state[action.payload.toProfile].profile,
						followingThem: false,
					},
				},
			};
		default:
			return state;
	}
}
