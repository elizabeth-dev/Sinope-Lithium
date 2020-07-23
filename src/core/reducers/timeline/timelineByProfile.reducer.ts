import {
	ReceiveTimelineAction,
	RequestTimelineAction,
	TimelineActionsDto,
} from '@core/actions/timeline.actions';
import { FetchFields } from '@shared/types/fetchFields.interface';

export interface TimelineByProfileState {
	[profile: string]: { timeline: string[] } & FetchFields;
}

const initialState: TimelineByProfileState = {};

export function timelineByProfileReducer(
	state = initialState,
	action: TimelineActionsDto,
): TimelineByProfileState {
	switch (action.type) {
		case RequestTimelineAction:
			return {
				...state,
				[action.payload.profile]: {
					...state[action.payload.profile],
					isFetching: true,
				},
			};
		case ReceiveTimelineAction:
			return {
				...state,
				[action.payload.profile]: {
					...state[action.payload.profile],
					timeline: action.payload.posts.map((post) => post.id),
					receivedAt: action.payload.receivedAt,
					isFetching: false,
				},
			};
		default:
			return state;
	}
}
