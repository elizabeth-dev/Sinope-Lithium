import {
	AuthActions,
	ILoginFailureAction,
	ILoginSuccessAction,
	IRegisterFailureAction,
	IRegisterSuccessAction,
	LoginAction,
	RegisterAction,
	TokenExpiredAction,
} from '@core/state/actions/auth.actions';
import { AppState } from '@core/state/app.store';
import { AuthService } from '@core/api/service/auth.service';
import { combineEpics, Epic } from 'redux-observable';
import { of, throwError } from 'rxjs';
import { catchError, filter, map, mergeMap } from 'rxjs/operators';
import { isOfType } from 'typesafe-actions';
import { AppActionsDto } from '../actions/app.actions';

const loginEpic: Epic<AppActionsDto, ILoginSuccessAction | ILoginFailureAction> = (action$) =>
	action$.pipe(
		filter(isOfType(LoginAction)),
		mergeMap((action) =>
			AuthService.login(action.payload.username, action.payload.password).pipe(
				map(({ accessToken, refreshToken, expiresAt }) =>
					AuthActions.loginSuccess(accessToken, refreshToken, expiresAt),
				),
				catchError((err: number) => {
					if (err === 401) return of(AuthActions.loginFailure());

					return throwError(err);
				}),
			),
		),
	);

const registerEpic: Epic<AppActionsDto, IRegisterSuccessAction | IRegisterFailureAction> = (action$) =>
	action$.pipe(
		filter(isOfType(RegisterAction)),
		mergeMap(({ payload }) =>
			AuthService.register({
				email: payload.email,
				password: payload.password,
			}).pipe(
				map(({ accessToken, refreshToken, expiresAt }) =>
					AuthActions.registerSuccess(accessToken, refreshToken, expiresAt),
				),
				catchError((err: number) => {
					if (err === 401) return of(AuthActions.registerFailure());

					return throwError(err);
				}),
			),
		),
	);

const accessTokenExpiredEpic: Epic<AppActionsDto, AppActionsDto, AppState> = (action$, state$) =>
	action$.pipe(
		filter(isOfType(TokenExpiredAction)),
		mergeMap(() =>
			AuthService.refresh(state$.value.auth.refreshToken!).pipe(
				map(({ accessToken, refreshToken, expiresAt }) =>
					AuthActions.refreshed(accessToken, refreshToken, expiresAt),
				),
			),
		),
	);

export const authEpic = combineEpics(loginEpic, accessTokenExpiredEpic, registerEpic);
