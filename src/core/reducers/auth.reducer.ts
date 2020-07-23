import {
	AuthActionsDto,
	LoginFailureAction,
	LoginSuccessAction,
	LogoutAction,
	LoginAction,
} from '@core/actions/auth.actions';

export interface AuthState {
	loggedIn: boolean;
	accessToken?: string;
	refreshToken?: string;
	expiresAt?: number;
	loggingIn: boolean;
	error: boolean;
}

const initialState: AuthState = {
	loggedIn: false,
	accessToken: undefined,
	loggingIn: false,
	refreshToken: undefined,
	expiresAt: undefined,
	error: false,
};

export function authReducer(
	state = initialState,
	action: AuthActionsDto,
): AuthState {
	switch (action.type) {
		case LoginAction:
			return { ...state, loggingIn: true, error: false };
		case LoginSuccessAction:
			return {
				...state,
				loggedIn: true,
				accessToken: action.payload.accessToken,
				refreshToken: action.payload.refreshToken,
				expiresAt: action.payload.expiresAt,
				loggingIn: false,
			};
		case LoginFailureAction:
			return { ...state, loggingIn: false, error: true };
		case LogoutAction:
			return { ...state, loggedIn: false, accessToken: undefined };
		default:
			return state;
	}
}
