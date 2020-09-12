import { AuthActionsDto, LoginSuccessAction, LogoutAction, RegisterSuccessAction } from '@core/actions/auth.actions';

export interface AuthState {
	loggedIn: boolean;
	accessToken?: string;
	refreshToken?: string;
	expiresAt?: number;
}

const initialState: AuthState = {
	loggedIn: false,
	accessToken: undefined,
	refreshToken: undefined,
	expiresAt: undefined,
};

export function authReducer(
	state = initialState,
	action: AuthActionsDto,
): AuthState {
	switch (action.type) {
		case LoginSuccessAction:
		case RegisterSuccessAction:
			return {
				...state,
				loggedIn: true,
				accessToken: action.payload.accessToken,
				refreshToken: action.payload.refreshToken,
				expiresAt: action.payload.expiresAt,
			};
		case LogoutAction:
			return { ...state, loggedIn: false, accessToken: undefined };
		default:
			return state;
	}
}
