import { AuthActions, LoginFailureAction, LoginSuccessAction, LogoutAction } from '@core/actions/auth.actions';

export interface AuthState {
	loggedIn: boolean;
	token?: string;
}

const initialState: AuthState = {
	loggedIn: false,
	token: undefined,
};

export function authReducer(
	state = initialState,
	action: AuthActions,
): AuthState {
	switch (action.type) {
		case LoginSuccessAction:
			return { loggedIn: true, token: action.payload.token };
		case LoginFailureAction:
			return { loggedIn: false, token: undefined };
		case LogoutAction:
			return { loggedIn: false, token: undefined };
		default:
			return state;
	}
}
