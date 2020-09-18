import { AppActionsDto } from '@core/actions';
import {
	CreateFirstProfileAction,
	CreateProfileAction,
	ICreatedFirstProfileAction,
	ICreatedProfileAction,
	IFailedCreateFirstProfileAction,
	IFailedCreateProfileAction,
	IReceiveProfilesAction,
	ProfileActions,
	RequestProfileAction,
} from '@core/actions/profile.actions';
import { AppState } from '@core/app.store';
import { ProfileService } from '@core/http/profile.service';
import { combineEpics, Epic } from 'redux-observable';
import { catchError, filter, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { isOfType } from 'typesafe-actions';
import { of, throwError } from 'rxjs';

const requestProfileEpic: Epic<AppActionsDto,
	IReceiveProfilesAction,
	AppState> = (action$, state$) =>
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

const createProfileEpic: Epic<AppActionsDto,
	ICreatedProfileAction | IFailedCreateProfileAction,
	AppState> = (action$, state$) =>
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

const createFirstProfileEpic: Epic<AppActionsDto,
	ICreatedFirstProfileAction | IFailedCreateFirstProfileAction,
	AppState> = (action$, state$) =>
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
				catchError((err: number) => {
					console.log(err);
					if (err === 401) return of(ProfileActions.failedCreateFirst());

					return throwError(err);
				}),
			),
		),
	);

export const profileEpic = combineEpics(
	requestProfileEpic,
	createProfileEpic,
	createFirstProfileEpic,
);
