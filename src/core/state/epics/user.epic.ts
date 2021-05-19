import { AppActionsDto } from '../actions/app.actions';
import {
	IReceiveSelfUserAction,
	ReceiveSelfUserAction,
	RequestSelfUserAction,
	UserActions,
} from '@core/state/actions/user.actions';
import { AppState } from '@core/state/app.store';
import { UserService } from '@core/api/service/user.service';
import { fromProfile } from '@core/state/selectors/profile.selectors';
import { dashboardRoot } from '@shared/navigation/roots/dashboard.root';
import { Navigation } from 'react-native-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { combineEpics, Epic } from 'redux-observable';
import { filter, ignoreElements, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { isOfType } from 'typesafe-actions';
import { userResToIUser } from '@core/mapper/user.mapper';

const loadSelfUserEpic: Epic<AppActionsDto, IReceiveSelfUserAction, AppState> = (action$, state$) =>
	action$.pipe(
		filter(isOfType(RequestSelfUserAction)),
		withLatestFrom(state$),
		mergeMap(([, state]) =>
			UserService.getSelf(state.auth.accessToken!).pipe(
				map((self) => UserActions.receiveSelf(userResToIUser(self, Date.now()), Date.now())),
			),
		),
	);

// TODO: [SLI-43] Implement custom flow for first login
const loadedSelfUserEpic: Epic<AppActionsDto, any, AppState> = (action$, state$) =>
	action$.pipe(
		filter(isOfType(ReceiveSelfUserAction)),
		withLatestFrom(state$),
		tap(([, state]) =>
			Promise.all([MaterialCommunityIcons.getImageSource('menu', 25)]).then(([menuIcon]) => {
				const currentProfile = fromProfile.current(state);

				Navigation.setRoot(
					dashboardRoot(menuIcon, currentProfile?.profile?.name, currentProfile?.profile?.tag),
				);
			}),
		),
		ignoreElements(),
	);

export const userEpic = combineEpics(loadSelfUserEpic, loadedSelfUserEpic);
