import {
	AuthActions,
	ILoginFailureAction,
	ILoginSuccessAction,
	LoginAction,
	TokenExpiredAction,
} from '@core/actions/auth.actions';
import { AppState } from '@core/app.store';
import { AuthService } from '@core/http/auth.service';
import { combineEpics, Epic } from 'redux-observable';
import { of, throwError } from 'rxjs';
import { catchError, filter, map, mergeMap } from 'rxjs/operators';
import { isOfType } from 'typesafe-actions';
import { AppActionsDto } from '../actions';

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

export const authEpic = combineEpics(loginEpic, accessTokenExpiredEpic);
