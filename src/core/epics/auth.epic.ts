import {
	ILoginSuccessAction,
	LoginAction,
	LoginSuccessAction,
	AuthActions,
	TokenExpiredAction,
} from '@core/actions/auth.actions';
import { AuthService } from '@core/http/auth.service';
import { dashboardRoot } from '@shared/navigation/roots/dashboard.root';
import { Navigation } from 'react-native-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { combineEpics, Epic } from 'redux-observable';
import { filter, ignoreElements, switchMap, tap, map } from 'rxjs/operators';
import { isOfType } from 'typesafe-actions';
import { AppActionsDto } from '../actions';
import { AppState } from '@core/app.store';

const loginEpic: Epic<AppActionsDto, ILoginSuccessAction> = (action$) =>
	action$.pipe(
		filter(isOfType(LoginAction)),
		switchMap((action) =>
			AuthService.login(action.payload.username, action.payload.password),
		),
		map(({ jwt: accessToken, refreshToken, expiresAt }) =>
			AuthActions.loginSuccess(accessToken, refreshToken, expiresAt),
		),
	);

const loginSuccessEpic: Epic<AppActionsDto> = (action$) =>
	action$.pipe(
		filter(isOfType(LoginSuccessAction)),
		tap(() =>
			Promise.all([
				MaterialCommunityIcons.getImageSource('menu', 25),
			]).then(([menuIcon]) => {
				Navigation.setRoot(dashboardRoot(menuIcon));
			}),
		),
		ignoreElements(),
	);

const accessTokenExpiredEpic: Epic<AppActionsDto, AppActionsDto, AppState> = (
	action$,
	state$,
) =>
	action$.pipe(
		filter(isOfType(TokenExpiredAction)),
		switchMap(() =>
			AuthService.refresh(state$.value.auth.refreshToken as string),
		),
		map(({ jwt: accessToken, refreshToken, expiresAt }) =>
			AuthActions.refreshed(accessToken, refreshToken, expiresAt),
		),
	);

export const authEpic = combineEpics(
	loginEpic,
	loginSuccessEpic,
	accessTokenExpiredEpic,
);
