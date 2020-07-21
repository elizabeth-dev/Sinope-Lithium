import {
	ProfileActionsDto,
	SwitchProfileAction,
} from '@core/actions/profile.actions';

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
	action: ProfileActionsDto,
): SelfProfilesState {
	switch (action.type) {
		case SwitchProfileAction:
			return { ...state, current: action.payload.profileId };
		default:
			return state;
	}
}
