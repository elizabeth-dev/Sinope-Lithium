import { AppActionsDto } from '@core/actions';
import {
	IReceiveProfilesAction,
	ProfileActions,
	RequestProfileAction,
	ICreatedProfileAction,
	IFailedCreateProfileAction,
	CreateProfileAction,
	ICreatedFirstProfileAction,
	IFailedCreateFirstProfileAction,
	CreateFirstProfileAction,
	CreatedFirstProfileAction,
} from '@core/actions/profile.actions';
import { AppState } from '@core/app.store';
import { ProfileService } from '@core/http/profile.service';
import { combineEpics, Epic } from 'redux-observable';
import { filter, map, mergeMap, withLatestFrom, tap, ignoreElements } from 'rxjs/operators';
import { isOfType } from 'typesafe-actions';
import { Navigation } from 'react-native-navigation';
import { dashboardRoot } from '@shared/navigation/roots/dashboard.root';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { fromProfile } from '@core/selectors/profile.selectors';

const requestProfileEpic: Epic<
	AppActionsDto,
	IReceiveProfilesAction,
	AppState
> = (action$, state$) =>
	action$.pipe(
		filter(isOfType(RequestProfileAction)),
		withLatestFrom(state$),
		mergeMap(([{ payload }, state]) =>
			ProfileService.getById(
				payload.profile,
				state.auth.accessToken as string,
			).pipe(
				map((profile) => ProfileActions.receive([profile], Date.now())),
			),
		),
	);

const createProfileEpic: Epic<
	AppActionsDto,
	ICreatedProfileAction | IFailedCreateProfileAction,
	AppState
> = (action$, state$) =>
	action$.pipe(
		filter(isOfType(CreateProfileAction)),
		withLatestFrom(state$),
		mergeMap(([action, state]) =>
			ProfileService.create(
				action.payload.newProfile,
				state.auth.accessToken as string,
			).pipe(
				map((profile) => ProfileActions.created(profile, Date.now())),
			),
		),
	);

const createFirstProfileEpic: Epic<
	AppActionsDto,
	ICreatedFirstProfileAction | IFailedCreateFirstProfileAction,
	AppState
> = (action$, state$) =>
	action$.pipe(
		filter(isOfType(CreateFirstProfileAction)),
		withLatestFrom(state$),
		mergeMap(([action, state]) =>
			ProfileService.create(
				action.payload.newProfile,
				state.auth.accessToken as string,
			).pipe(
				map((profile) =>
					ProfileActions.createdFirst(profile, Date.now()),
				),
			),
		),
	);

const createdFirstProfileEpic: Epic<AppActionsDto, any, AppState> = (
	action$,
	state$,
) =>
	action$.pipe(
		filter(isOfType(CreatedFirstProfileAction)),
		withLatestFrom(state$),
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
		ignoreElements(),
	);

export const profileEpic = combineEpics(
	requestProfileEpic,
	createProfileEpic,
	createFirstProfileEpic,
	createdFirstProfileEpic,
);
