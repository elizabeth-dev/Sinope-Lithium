import { AppActionsDto } from '@core/actions';
import {
	ISwitchedProfileAction,
	SelfActions,
	SwitchedProfileAction,
	SwitchProfileAction,
} from '@core/actions/self.actions';
import { AppState } from '@core/app.store';
import { fromProfile } from '@core/selectors/profile.selectors';
import { DataService } from '@core/services/data.service';
import { dashboardRoot } from '@shared/navigation/roots/dashboard.root';
import { Navigation } from 'react-native-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { combineEpics, Epic } from 'redux-observable';
import { filter, ignoreElements, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { isOfType } from 'typesafe-actions';

const switchProfileEpic: Epic<AppActionsDto, ISwitchedProfileAction, AppState> =
	(action$, state$) => action$.pipe(
		filter(isOfType(SwitchProfileAction)),
		withLatestFrom(state$),
		mergeMap(([{ payload }, state]) =>
			DataService.saveProfileData(state.self.currentProfile, state.currentData)
				.pipe(
					mergeMap(() => DataService.getProfileData(payload.profileId)),
					map((data) => SelfActions.switchedProfile(payload.profileId, data)))),
	);

const switchedProfileEpic: Epic<AppActionsDto, any, AppState> = (action$, state$) => action$.pipe(filter(isOfType(
	SwitchedProfileAction)), withLatestFrom(state$),
	tap(([, state]) =>
		Promise.all([
			MaterialCommunityIcons.getImageSource('menu', 25),
		]).then(([menuIcon]) => {
			const currentProfile = fromProfile.current(state);

			Navigation.setRoot(
				dashboardRoot(
					menuIcon,
					currentProfile?.profile?.name,
					currentProfile?.profile?.tag,
				),
			);
		}),
	),
	ignoreElements());

export const selfEpic = combineEpics(switchProfileEpic, switchedProfileEpic);
