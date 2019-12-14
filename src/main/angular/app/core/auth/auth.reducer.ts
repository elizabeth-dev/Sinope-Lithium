import { Action, createReducer, on } from '@ngrx/store';

import * as AuthActions from './actions';
import { UserPayload } from './interfaces/UserPayload.interface';
import { AppSettingsService } from '@src/app/core/services/app-settings/app-settings.service';

export interface AuthState {
	token: string;
	userData: UserPayload;
	loggedIn: boolean;
	error: string;
}

const AuthTokenKey = 'token';
const AuthUserDataKey = 'user';

const initialState: AuthState = {
	token: AppSettingsService.getString(AuthTokenKey),
	userData: JSON.parse(AppSettingsService.getString(AuthUserDataKey)),
	loggedIn: !!AppSettingsService.getString(AuthTokenKey),
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

			AppSettingsService.setString(AuthTokenKey, token);
			AppSettingsService.setString(AuthUserDataKey, userData);

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
		AppSettingsService.clear();

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
