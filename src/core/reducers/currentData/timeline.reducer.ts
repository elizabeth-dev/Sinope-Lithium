import { ReceiveTimelineAction, RequestTimelineAction, TimelineActionsDto } from '@core/actions/timeline.actions';
import { FetchEntity } from '@shared/types/fetchFields.interface';

export interface TimelineState {
	[profile: string]: FetchEntity<'timeline', string[]>;
}

const initialState: TimelineState = {};

export function timelineReducer(
	state = initialState,
	action: TimelineActionsDto,
): TimelineState {
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
