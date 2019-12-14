import { Action, createReducer, on } from '@ngrx/store';

import * as AuthActions from './actions';
import { UserPayload } from './interfaces/UserPayload.interface';

export interface AuthState {
	token: string;
	userData: UserPayload;
	loggedIn: boolean;
	error: string;
}

const AuthTokenKey = 'token';
const AuthUserDataKey = 'user';

const initialState: AuthState = {
	token: localStorage.getItem(AuthTokenKey),
	userData: JSON.parse(localStorage.getItem(AuthUserDataKey)),
	loggedIn: !!localStorage.getItem(AuthTokenKey),
	error: undefined,
};

const _authReducer = createReducer(
	initialState,
	on(
		AuthActions.login,
		(state) => (
			{
				...state,
				error: null,
			}
		),
	),
	on(
		AuthActions.loginSuccess,
		(
			state,
			{ token },
		) => {
			const userData = atob(token.split('.')[1]);

			localStorage.setItem(AuthTokenKey, token);
			localStorage.setItem(AuthUserDataKey, userData);

			return {
				...state,
				userData: JSON.parse(userData),
				token,
				loggedIn: true,
				error: null,
			};
		},
	),
	on(
		AuthActions.loginFailure,
		(
			state,
			error,
		) => (
			{
				...state,
				error,
			}
		),
	),
	on(AuthActions.logout, (state) => {
		localStorage.clear();

		return {
			...state,
			userData: undefined,
			token: undefined,
			loggedIn: false,
			error: null,
		};
	}),
);

export function authReducer(
	state: AuthState | undefined,
	action: Action,
) {
	return _authReducer(state, action);
}
