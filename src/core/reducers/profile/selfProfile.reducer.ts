import { ProfileActionsDto, SwitchProfileAction } from '@core/actions/profile.actions';
import { mockedProfiles } from '@core/mocks/profile/commonProfiles.mock';

export interface SelfProfilesState {
	current: string;
	profiles: string[];
}

const initialState: SelfProfilesState = {
	current: Object.values(mockedProfiles)[0].id,
	profiles: Object.values(mockedProfiles).map((profile) => profile.id),
};

export function selfProfilesReducer(state = initialState, action: ProfileActionsDto): SelfProfilesState {
	switch (action.type) {
		case SwitchProfileAction:
			return { ...state, current: action.payload.profileId };
		default:
			return state;
	}
}
