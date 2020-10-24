import {
	AuthActionsDto,
	RegisterAction,
	RegisterFailureAction,
	RegisterSuccessAction,
} from '@core/state/actions/auth.actions';

export interface RegisterState {
	error: boolean;
	isFetching: boolean;
}

const initialState: RegisterState = {
	error: false,
	isFetching: false,
};

export function registerReducer(
	state = initialState,
	action: AuthActionsDto,
): RegisterState {
	switch (action.type) {
		case RegisterAction:
			return { ...state, isFetching: true, error: false };
		case RegisterSuccessAction:
			return { ...state, isFetching: false, error: false };
		case RegisterFailureAction:
			return { ...state, isFetching: false, error: true };
		default:
			return state;
	}
}
