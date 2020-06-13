import {
	AuthActionsDto,
	LoginFailureAction,
	LoginSuccessAction,
	LogoutAction,
	LoginAction,
} from '@core/actions/auth.actions';

export interface AuthState {
	loggedIn: boolean;
	token?: string;
	loggingIn: boolean;
}

const initialState: AuthState = {
	loggedIn: false,
	token: undefined,
	loggingIn: false,
};

export function authReducer(state = initialState, action: AuthActionsDto): AuthState {
	switch (action.type) {
		case LoginAction:
			return { ...state, loggingIn: true };
		case LoginSuccessAction:
			return { ...state, loggedIn: true, token: action.payload.token, loggingIn: false };
		case LoginFailureAction:
			return { ...state, loggingIn: false };
		case LogoutAction:
			return { ...state, loggedIn: false, token: undefined };
		default:
			return state;
	}
}
