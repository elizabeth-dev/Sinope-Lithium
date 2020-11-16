import { AppActionsDto } from '@core/state/actions';
import {
	CreateFirstProfileAction,
	CreateProfileAction,
	FollowProfileAction,
	ICreatedFirstProfileAction,
	ICreatedProfileAction,
	IFailedCreateFirstProfileAction,
	IFailedCreateProfileAction,
	IFollowedProfileAction,
	IReceiveProfilesAction,
	IUnfollowedProfileAction,
	ProfileActions,
	RequestProfileAction,
	UnfollowProfileAction,
} from '@core/state/actions/profile.actions';
import { AppState } from '@core/state/app.store';
import { ProfileService } from '@core/http/profile.service';
import { combineEpics, Epic } from 'redux-observable';
import { catchError, filter, map, mapTo, mergeMap, withLatestFrom } from 'rxjs/operators';
import { isOfType } from 'typesafe-actions';
import { of, throwError } from 'rxjs';

const requestProfileEpic: Epic<AppActionsDto, IReceiveProfilesAction, AppState> = (action$,
	state$) => action$.pipe(filter(isOfType(RequestProfileAction)),
	withLatestFrom(state$),
	mergeMap(([{ payload }, state]) => ProfileService.getById(payload.profile,
		payload.fromProfile,
		state.auth.accessToken!,
		)
		.pipe(map((profile) => ProfileActions.receive([profile], Date.now())))),
);

const createProfileEpic: Epic<AppActionsDto, ICreatedProfileAction | IFailedCreateProfileAction, AppState> = (action$,
	state$) => action$.pipe(filter(isOfType(CreateProfileAction)),
	withLatestFrom(state$),
	mergeMap(([action, state]) => ProfileService.create(action.payload.newProfile,
		state.auth.accessToken!,
		)
		.pipe(map((profile) => ProfileActions.created(profile, Date.now())))),
);

const createFirstProfileEpic: Epic<AppActionsDto, ICreatedFirstProfileAction | IFailedCreateFirstProfileAction, AppState> = (action$,
	state$) => action$.pipe(filter(isOfType(CreateFirstProfileAction)),
	withLatestFrom(state$),
	mergeMap(([action, state]) => ProfileService.create(action.payload.newProfile,
		state.auth.accessToken!,
	).pipe(map((profile) => ProfileActions.createdFirst(profile, Date.now())),
		catchError((err: number) => {
			console.log(err);
			if (err === 401) return of(ProfileActions.failedCreateFirst());

			return throwError(err);
		}),
	)),
);

const followProfileEpic: Epic<AppActionsDto, IFollowedProfileAction, AppState> = (action$,
	state$) => action$.pipe(filter(isOfType(FollowProfileAction)),
	withLatestFrom(state$),
	mergeMap(([{ payload }, state]) => ProfileService.follow(payload.toProfile,
		payload.fromProfile,
		state.auth.accessToken!,
		)
		.pipe(mapTo(ProfileActions.followed(payload.fromProfile, payload.toProfile)))),
);

const unfollowProfileEpic: Epic<AppActionsDto, IUnfollowedProfileAction, AppState> = (action$,
	state$) => action$.pipe(filter(isOfType(UnfollowProfileAction)),
	withLatestFrom(state$),
	mergeMap(([{ payload }, state]) => ProfileService.unfollow(payload.toProfile,
		payload.fromProfile,
		state.auth.accessToken!,
		)
		.pipe(mapTo(ProfileActions.unfollowed(payload.fromProfile, payload.toProfile)))),
);

export const profileEpic = combineEpics(requestProfileEpic,
	createProfileEpic,
	createFirstProfileEpic,
	followProfileEpic,
	unfollowProfileEpic,
);
