import {
	UserActionsDto,
	ReceiveSelfUserAction,
} from '@core/actions/user.actions';

export type SelfUserState = string;

const initialState: SelfUserState = '';

export function selfUserReducer(
	state = initialState,
	action: UserActionsDto,
): SelfUserState {
	switch (action.type) {
		case ReceiveSelfUserAction:
			return action.payload.user.id;
		default:
			return state;
	}
}
