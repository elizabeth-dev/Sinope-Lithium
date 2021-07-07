import {
	IReceiveSelfUserAction,
	ReceiveSelfUserAction,
	RequestSelfUserAction,
	UserActions,
} from '@actions/user.actions';
import { UserService } from '@core/api/service/user.service';
import { userResToIUser } from '@core/mapper/user.mapper';
import { AppState } from '@core/state/app.store';
import { fromProfile } from '@core/state/selectors/profile.selectors';
import { dashboardRoot } from '@shared/navigation/roots/dashboard.root';
import { Expirable } from '@shared/types/epic.type';
import { errorHandler } from '@shared/utils/epic.utils';
import { Navigation } from 'react-native-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { combineEpics, Epic } from 'redux-observable';
import { filter, ignoreElements, map, mergeMap, tap, withLatestFrom } from 'rxjs';
import { isOfType } from 'typesafe-actions';
import { AppActionsDto } from '../actions/app.actions';

const loadSelfUserEpic: Epic<AppActionsDto, Expirable<IReceiveSelfUserAction>, AppState> = (action$, state$) =>
	action$.pipe(
		filter(isOfType(RequestSelfUserAction)),
		withLatestFrom(state$),
		mergeMap(([action, state]) =>
			UserService.getSelf(state.auth.accessToken!).pipe(
				map((self) =>
					UserActions.receiveSelf({ user: userResToIUser(self, Date.now()), receivedAt: Date.now() }),
				),
				errorHandler(action),
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
