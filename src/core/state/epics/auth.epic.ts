import {
	AuthActions,
	ILoginFailureAction,
	ILoginSuccessAction,
	IRefreshedTokenAction,
	IRegisterFailureAction,
	IRegisterSuccessAction,
	LoginAction,
	RefreshedTokenAction,
	RegisterAction,
	TokenExpiredAction,
} from '@actions/auth.actions';
import { AuthService } from '@core/api/service/auth.service';
import { AppState } from '@core/state/app.store';
import { combineEpics, Epic } from 'redux-observable';
import { catchError, filter, map, mergeMap, of, throwError } from 'rxjs';
import { isOfType } from 'typesafe-actions';
import { AppActionsDto } from '../actions/app.actions';

const loginEpic: Epic<AppActionsDto, ILoginSuccessAction | ILoginFailureAction> = (action$) =>
	action$.pipe(
		filter(isOfType(LoginAction)),
		mergeMap((action) =>
			AuthService.login(action.payload.email, action.payload.password).pipe(
				map(({ accessToken, refreshToken, expiresAt }) =>
					AuthActions.loginSuccess({ accessToken, refreshToken, expiresAt }),
				),
				catchError((err: number) => {
					if (err === 401) return of(AuthActions.loginFailure());

					return throwError(() => err);
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
					AuthActions.registerSuccess({ accessToken, refreshToken, expiresAt }),
				),
				catchError((err: number) => {
					if (err === 401) return of(AuthActions.registerFailure());

					return throwError(() => err);
				}),
			),
		),
	);

const accessTokenExpiredEpic: Epic<AppActionsDto, IRefreshedTokenAction, AppState> = (action$, state$) =>
	action$.pipe(
		filter(isOfType(TokenExpiredAction)),
		mergeMap(({ payload }) =>
			AuthService.refresh(state$.value.auth.refreshToken!).pipe(
				map(({ accessToken, refreshToken, expiresAt }) =>
					AuthActions.refreshed({ accessToken, refreshToken, expiresAt, action: payload.action }),
				),
			),
		),
	);

const accessTokenRefreshedEpic: Epic<AppActionsDto, AppActionsDto, AppState> = (action$) =>
	action$.pipe(
		filter(isOfType(RefreshedTokenAction)),
		map(({ payload }) => payload.action),
	);

export const authEpic = combineEpics(loginEpic, accessTokenExpiredEpic, registerEpic, accessTokenRefreshedEpic);
