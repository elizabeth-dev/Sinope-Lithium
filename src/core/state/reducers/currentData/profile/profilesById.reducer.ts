import {
	CreatedFirstProfileAction,
	CreatedProfileAction,
	FollowedProfileAction,
	ProfileActionsDto,
	ReceiveProfileFollowersAction,
	ReceiveProfileFollowingAction,
	ReceiveProfilesAction,
	RequestProfileAction,
	RequestProfileFollowersAction,
	RequestProfileFollowingAction,
	UnfollowedProfileAction,
} from '@core/state/actions/profile.actions';
import { IReceiveSelfUserAction, ReceiveSelfUserAction } from '@core/state/actions/user.actions';
import { IProfile, ProfileEntity } from '@shared/types/entities/profile.interface';
import { IReceiveSearchAction, ReceiveSearchAction } from '../../../actions/search.actions';
import { IReceivePostsAction, IReceiveProfilePostsAction, ReceivePostsAction } from '../../../actions/post.actions';
import { IReceiveTimelineAction, ReceiveTimelineAction } from '../../../actions/timeline.actions';
import { ProfileRS } from '@core/api/model/profile.model';

export interface ProfilesByIdState {
	[id: string]: ProfileEntity;
}

const initialState: ProfilesByIdState = {};

function flattenProfile(id: string, original: ProfileEntity, obj: Partial<IProfile>): ProfilesByIdState {
	return {
		[id]: {
			...original,
			profile: {
				...original.profile,
				...obj,
			},
		},
	};
}

function mapProfile(profile: ProfileRS, receivedAt: number): IProfile {
	return {
		...profile,
		followers: { profiles: profile.followers, receivedAt, isFetching: false },
		following: { profiles: profile.following, receivedAt, isFetching: false },
	};
}

function reduceProfileList(profiles: ProfileRS[], receivedAt: number): ProfilesByIdState {
	return profiles.reduce(
		(acc, profile) => ({
			...acc,
			[profile.id]: {
				profile: mapProfile(profile, receivedAt),
				isFetching: false,
				receivedAt,
			},
		}),
		{} as ProfilesByIdState,
	);
}

export function profilesByIdReducer(
	state = initialState,
	action:
		| ProfileActionsDto
		| IReceiveSelfUserAction
		| IReceiveSearchAction
		| IReceivePostsAction
		| IReceiveProfilePostsAction
		| IReceiveTimelineAction,
): ProfilesByIdState {
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
				...state,
				...reduceProfileList(action.payload.profiles, action.payload.receivedAt),
			};
		case ReceiveSearchAction:
			return {
				...state,
				...reduceProfileList(action.payload.profiles, action.payload.receivedAt),
				...action.payload.posts.reduce(
					(acc, post) => ({
						...acc,
						[post.profile.id]: {
							profile: post.profile,
							isFetching: false,
							receivedAt: action.payload.receivedAt,
						},
					}),
					{} as ProfilesByIdState,
				),
			};
		case ReceiveTimelineAction:
		case ReceivePostsAction:
			return {
				...state,
				...action.payload.posts.reduce(
					(acc, post) => ({
						...acc,
						[post.profile.id]: {
							profile: post.profile,
							isFetching: false,
							receivedAt: action.payload.receivedAt,
						},
					}),
					{} as ProfilesByIdState,
				),
			};
		case ReceiveSelfUserAction:
			return {
				...state,
				...reduceProfileList(action.payload.user.profiles, action.payload.receivedAt),
			};
		case CreatedProfileAction:
		case CreatedFirstProfileAction:
			return {
				...state,
				[action.payload.profile.id]: {
					profile: mapProfile(action.payload.profile, action.payload.receivedAt),
					isFetching: false,
					receivedAt: action.payload.receivedAt,
				},
			};
		case FollowedProfileAction:
			return {
				...state,
				...flattenProfile(action.payload.toProfile, state[action.payload.toProfile], { followingThem: true }),
			};
		case UnfollowedProfileAction:
			return {
				...state,
				...flattenProfile(action.payload.toProfile, state[action.payload.toProfile], { followingThem: false }),
			};
		case RequestProfileFollowingAction:
			return {
				...state,
				...flattenProfile(action.payload.profile, state[action.payload.profile], {
					following: {
						...state[action.payload.profile].profile.following,
						isFetching: true,
					},
				}),
			};
		case RequestProfileFollowersAction:
			return {
				...state,
				...flattenProfile(action.payload.profile, state[action.payload.profile], {
					followers: {
						...state[action.payload.profile].profile.followers,
						isFetching: true,
					},
				}),
			};
		case ReceiveProfileFollowingAction:
			return {
				...state,
				...reduceProfileList(action.payload.following, action.payload.receivedAt),
				...flattenProfile(action.payload.profile, state[action.payload.profile], {
					following: {
						...state[action.payload.profile].profile.following,
						isFetching: false,
						receivedAt: action.payload.receivedAt,
						profiles: action.payload.following.map((el) => el.id),
					},
				}),
			};
		case ReceiveProfileFollowersAction:
			return {
				...state,
				...reduceProfileList(action.payload.followers, action.payload.receivedAt),
				...flattenProfile(action.payload.profile, state[action.payload.profile], {
					followers: {
						...state[action.payload.profile].profile.followers,
						isFetching: false,
						receivedAt: action.payload.receivedAt,
						profiles: action.payload.followers.map((el) => el.id),
					},
				}),
			};
		default:
			return state;
	}
}
