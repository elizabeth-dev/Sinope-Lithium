import {
	ProfileActionsDto,
	ReceiveProfilesAction,
	RequestProfileAction,
} from '@core/actions/profile.actions';
import { IProfile } from '@shared/types/entities/profile.interface';
import { FetchFields } from '@shared/types/fetchFields.interface';

export interface ProfilesByIdState {
	[id: string]: { profile: IProfile } & FetchFields;
}

const initialState: ProfilesByIdState = {};

export function profilesByIdReducer(
	state = initialState,
	action: ProfileActionsDto,
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
				...action.payload.profiles.reduce(
					(acc, profile) => ({
						...acc,
						[profile.id]: {
							profile,
							isFetching: false,
							receivedAt: action.payload.receivedAt,
						},
					}),
					{} as ProfilesByIdState,
				),
			};
		default:
			return state;
	}
}
