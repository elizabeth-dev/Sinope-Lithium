import { CreatedFirstProfileAction, CreatedProfileAction, ProfileActionsDto } from '@actions/profile.actions';
import { SelfActionsDto, SwitchedProfileAction } from '@actions/self.actions';
import { IInitializeDataSuccessAction, InitializeDataSuccessAction } from '@actions/user.actions';

export type SelfProfileState = string;

const initialState: SelfProfileState = '';

export function selfProfileReducer(
	state = initialState,
	action: SelfActionsDto | ProfileActionsDto | IInitializeDataSuccessAction,
): SelfProfileState {
	switch (action.type) {
		case SwitchedProfileAction:
			return action.payload.profileId;
		case InitializeDataSuccessAction:
			return action.payload.user.profiles[0]?.id;
		case CreatedFirstProfileAction:
		case CreatedProfileAction:
			return action.payload.profile.id;
		default:
			return state;
	}
}
