import { CreatedFirstProfileAction, CreatedProfileAction, ProfileActionsDto } from '@core/state/actions/profile.actions';
import { IReceiveSelfUserAction, ReceiveSelfUserAction } from '@core/state/actions/user.actions';
import { SelfActionsDto, SwitchedProfileAction } from '@core/state/actions/self.actions';

export type SelfProfileState = string;

const initialState: SelfProfileState = '';

export function selfProfileReducer(
	state = initialState,
	action: SelfActionsDto | ProfileActionsDto | IReceiveSelfUserAction,
): SelfProfileState {
	switch (action.type) {
		case SwitchedProfileAction:
			return action.payload.profileId;
		case ReceiveSelfUserAction:
			return action.payload.user.profiles[0]?.id;
		case CreatedFirstProfileAction:
		case CreatedProfileAction:
			return action.payload.profile.id;
		default:
			return state;
	}
}
