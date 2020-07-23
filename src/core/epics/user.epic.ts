import { AppActionsDto } from '@core/actions';
import { LoginSuccessAction } from '@core/actions/auth.actions';
import {
	IReceiveSelfUserAction,
	IRequestSelfUserAction,
	ReceiveSelfUserAction,
	RequestSelfUserAction,
	UserActions,
} from '@core/actions/user.actions';
import { AppState } from '@core/app.store';
import { UserService } from '@core/http/user.service';
import { dashboardRoot } from '@shared/navigation/roots/dashboard.root';
import { Navigation } from 'react-native-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { combineEpics, Epic } from 'redux-observable';
import {
	filter,
	ignoreElements,
	map,
	mapTo,
	mergeMap,
	tap,
	withLatestFrom,
} from 'rxjs/operators';
import { isOfType } from 'typesafe-actions';

const requestSelfUserEpic: Epic<AppActionsDto, IRequestSelfUserAction> = (
	action$,
) =>
	action$.pipe(
		filter(isOfType(LoginSuccessAction)),
		mapTo(UserActions.requestSelf()),
	);

const loadSelfUserEpic: Epic<
	AppActionsDto,
	IReceiveSelfUserAction,
	AppState
> = (action$, state$) =>
	action$.pipe(
		filter(isOfType(RequestSelfUserAction)),
		withLatestFrom(state$),
		mergeMap(([, state]) =>
			UserService.getSelf(state.auth.accessToken as string).pipe(
				map((self) => UserActions.receiveSelf(self, Date.now())),
			),
		),
	);

// TODO: [SLI-43] Implement custom flow for first login
const loadedSelfUserEpic: Epic<AppActionsDto> = (action$) =>
	action$.pipe(
		filter(isOfType(ReceiveSelfUserAction)),
		tap(() =>
			Promise.all([
				MaterialCommunityIcons.getImageSource('menu', 25),
			]).then(([menuIcon]) => {
				Navigation.setRoot(dashboardRoot(menuIcon));
			}),
		),
		ignoreElements(),
	);

export const userEpic = combineEpics(
	requestSelfUserEpic,
	loadSelfUserEpic,
	loadedSelfUserEpic,
);
