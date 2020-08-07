import {
	AuthActions,
	ILoginFailureAction,
	ILoginSuccessAction,
	LoginAction,
	TokenExpiredAction,
	IRegisterSuccessAction,
	IRegisterFailureAction,
	RegisterAction,
	RegisterSuccessAction,
} from '@core/actions/auth.actions';
import { AppState } from '@core/app.store';
import { AuthService } from '@core/http/auth.service';
import { combineEpics, Epic } from 'redux-observable';
import { of, throwError } from 'rxjs';
import {
	catchError,
	filter,
	map,
	mergeMap,
	tap,
	ignoreElements,
} from 'rxjs/operators';
import { isOfType } from 'typesafe-actions';
import { AppActionsDto } from '../actions';
import { Navigation } from 'react-native-navigation';
import { firstProfileRoot } from '@shared/navigation/roots/firstProfile.root';

const loginEpic: Epic<
	AppActionsDto,
	ILoginSuccessAction | ILoginFailureAction
> = (action$) =>
	action$.pipe(
		filter(isOfType(LoginAction)),
		mergeMap((action) =>
			AuthService.login(
				action.payload.username,
				action.payload.password,
			).pipe(
				map(({ jwt: accessToken, refreshToken, expiresAt }) =>
					AuthActions.loginSuccess(
						accessToken,
						refreshToken,
						expiresAt,
					),
				),
				catchError((err: number) => {
					if (err === 401) return of(AuthActions.loginFailure());

					return throwError(err);
				}),
			),
		),
	);

const registerEpic: Epic<
	AppActionsDto,
	IRegisterSuccessAction | IRegisterFailureAction
> = (action$) =>
	action$.pipe(
		filter(isOfType(RegisterAction)),
		mergeMap(({ payload }) =>
			AuthService.register({
				name: payload.name,
				email: payload.email,
				password: payload.password,
			}).pipe(
				map(({ jwt: accessToken, refreshToken, expiresAt }) =>
					AuthActions.registerSuccess(
						accessToken,
						refreshToken,
						expiresAt,
					),
				),
				catchError((err: number) => {
					if (err === 401) return of(AuthActions.registerFailure());

					return throwError(err);
				}),
			),
		),
	);

const registeredEpic: Epic<AppActionsDto> = (action$) =>
	action$.pipe(
		filter(isOfType(RegisterSuccessAction)),
		tap(() => Navigation.setRoot(firstProfileRoot())),
		ignoreElements(),
	);

const accessTokenExpiredEpic: Epic<AppActionsDto, AppActionsDto, AppState> = (
	action$,
	state$,
) =>
	action$.pipe(
		filter(isOfType(TokenExpiredAction)),
		mergeMap(() =>
			AuthService.refresh(state$.value.auth.refreshToken as string).pipe(
				map(({ jwt: accessToken, refreshToken, expiresAt }) =>
					AuthActions.refreshed(accessToken, refreshToken, expiresAt),
				),
			),
		),
	);

export const authEpic = combineEpics(
	loginEpic,
	accessTokenExpiredEpic,
	registerEpic,
	registeredEpic,
);
