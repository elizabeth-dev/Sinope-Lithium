import { AuthActionsDto, LoginAction, LoginFailureAction, LoginSuccessAction } from '@actions/auth.actions';

export interface LoginState {
	error: boolean;
	isFetching: boolean;
}

const initialState: LoginState = {
	error: false,
	isFetching: false,
};

export function loginReducer(state = initialState, action: AuthActionsDto): LoginState {
	switch (action.type) {
		case LoginAction:
			return { ...state, isFetching: true, error: false };
		case LoginSuccessAction:
			return { ...state, isFetching: false, error: false };
		case LoginFailureAction:
			return { ...state, isFetching: false, error: true };
		default:
			return state;
	}
}
