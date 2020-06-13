import { AppActionsDto } from '@core/actions';
import { AuthActions, ILoginSuccessAction, LoginAction, LoginSuccessAction } from '@core/actions/auth.actions';
import { dashboardRoot } from '@shared/navigation/roots/dashboard.root';
import { Navigation } from 'react-native-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { combineEpics, Epic } from 'redux-observable';
import { delay, filter, mapTo, tap, ignoreElements } from 'rxjs/operators';
import { isOfType } from 'typesafe-actions';

const loginEpic: Epic<AppActionsDto, ILoginSuccessAction> = (action$) =>
	action$.pipe(filter(isOfType(LoginAction)), delay(1500), mapTo(AuthActions.loginSuccess('aaa')));

const loginSuccessEpic: Epic<AppActionsDto> = (action$) =>
	action$.pipe(
		filter(isOfType(LoginSuccessAction)),
		tap(() =>
			Promise.all([MaterialCommunityIcons.getImageSource('menu', 25)]).then(([menuIcon]) => {
				Navigation.setRoot(dashboardRoot(menuIcon));
			}),
		),
		ignoreElements(),
	);

export const authEpic = combineEpics(loginEpic, loginSuccessEpic);
