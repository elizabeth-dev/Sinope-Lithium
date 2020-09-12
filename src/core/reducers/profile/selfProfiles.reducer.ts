import {
	CreatedFirstProfileAction,
	CreatedProfileAction,
	ProfileActionsDto,
	SwitchProfileAction,
} from '@core/actions/profile.actions';
import { IReceiveSelfUserAction, ReceiveSelfUserAction } from '@core/actions/user.actions';

export interface SelfProfilesState {
	current: string;
	profiles: string[];
}

const initialState: SelfProfilesState = {
	current: '',
	profiles: [],
};

export function selfProfilesReducer(
	state = initialState,
	action: ProfileActionsDto | IReceiveSelfUserAction,
): SelfProfilesState {
	switch (action.type) {
		case SwitchProfileAction:
			return { ...state, current: action.payload.profileId };
		case ReceiveSelfUserAction:
			return {
				...state,
				profiles: action.payload.user.profiles.map(
					(profile) => profile.id,
				),
				current: action.payload.user.profiles[0]?.id,
			};
		case CreatedFirstProfileAction:
		case CreatedProfileAction:
			return {
				...state,
				profiles: [...state.profiles, action.payload.profile.id],
				current: action.payload.profile.id,
			};
		default:
			return state;
	}
}
