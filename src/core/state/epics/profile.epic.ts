import {
	CreateFirstProfileAction,
	CreateProfileAction,
	FollowProfileAction,
	ICreatedFirstProfileAction,
	ICreatedProfileAction,
	IFailedCreateFirstProfileAction,
	IFailedCreateProfileAction,
	IFollowedProfileAction,
	IReceiveProfileFollowersAction,
	IReceiveProfileFollowingAction,
	IReceiveProfilesAction,
	IUnfollowedProfileAction,
	ProfileActions,
	RequestProfileAction,
	RequestProfileFollowersAction,
	RequestProfileFollowingAction,
	UnfollowProfileAction,
} from '@actions/profile.actions';
import { ProfileService } from '@core/api/service/profile.service';
import { profileResToIProfile } from '@core/mapper/profile.mapper';
import { AppState } from '@core/state/app.store';
import { Expirable } from '@shared/types/epic.type';
import { errorHandler } from '@shared/utils/epic.utils';
import { combineEpics, Epic } from 'redux-observable';
import { catchError, filter, map, mapTo, mergeMap, of, throwError, withLatestFrom } from 'rxjs';
import { isOfType } from 'typesafe-actions';
import { AppActionsDto } from '../actions/app.actions';

const requestProfileEpic: Epic<AppActionsDto, Expirable<IReceiveProfilesAction>, AppState> = (action$, state$) =>
	action$.pipe(
		filter(isOfType(RequestProfileAction)),
		withLatestFrom(state$),
		mergeMap(([action, state]) =>
			ProfileService.getById(action.payload.profile, action.payload.fromProfile, state.auth.accessToken!).pipe(
				map((profile) =>
					ProfileActions.receive({
						profiles: [
							profileResToIProfile(profile, Date.now()),
							...(profile.following
								? profile.following.map((follow) => profileResToIProfile(follow, Date.now()))
								: []),
							...(profile.followers
								? profile.followers.map((follow) => profileResToIProfile(follow, Date.now()))
								: []),
						],
						receivedAt: Date.now(),
					}),
				),
				errorHandler(action),
			),
		),
	);

const createProfileEpic: Epic<
	AppActionsDto,
	Expirable<ICreatedProfileAction | IFailedCreateProfileAction>,
	AppState
> = (action$, state$) =>
	action$.pipe(
		filter(isOfType(CreateProfileAction)),
		withLatestFrom(state$),
		mergeMap(([action, state]) =>
			ProfileService.create(action.payload.newProfile, state.auth.accessToken!).pipe(
				map((profile) =>
					ProfileActions.created({
						profile: profileResToIProfile(profile, Date.now()),
						receivedAt: Date.now(),
					}),
				),
				errorHandler(action),
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
			ProfileService.create(action.payload.newProfile, state.auth.accessToken!).pipe(
				map((profile) =>
					ProfileActions.createdFirst({
						profile: profileResToIProfile(profile, Date.now()),
						receivedAt: Date.now(),
					}),
				),
				catchError((err: number) => {
					console.error(err);
					if (err === 401) return of(ProfileActions.failedCreateFirst());

					return throwError(() => err);
				}),
			),
		),
	);

const followProfileEpic: Epic<AppActionsDto, Expirable<IFollowedProfileAction>, AppState> = (action$, state$) =>
	action$.pipe(
		filter(isOfType(FollowProfileAction)),
		withLatestFrom(state$),
		mergeMap(([action, state]) =>
			ProfileService.follow(action.payload.toProfile, action.payload.fromProfile, state.auth.accessToken!).pipe(
				mapTo(
					ProfileActions.followed({
						fromProfile: action.payload.fromProfile,
						toProfile: action.payload.toProfile,
					}),
				),
				errorHandler(action),
			),
		),
	);

const unfollowProfileEpic: Epic<AppActionsDto, Expirable<IUnfollowedProfileAction>, AppState> = (action$, state$) =>
	action$.pipe(
		filter(isOfType(UnfollowProfileAction)),
		withLatestFrom(state$),
		mergeMap(([action, state]) =>
			ProfileService.unfollow(action.payload.toProfile, action.payload.fromProfile, state.auth.accessToken!).pipe(
				mapTo(
					ProfileActions.unfollowed({
						fromProfile: action.payload.fromProfile,
						toProfile: action.payload.toProfile,
					}),
				),
				errorHandler(action),
			),
		),
	);

const getProfileFollowingEpic: Epic<AppActionsDto, Expirable<IReceiveProfileFollowingAction>, AppState> = (
	action$,
	state$,
) =>
	action$.pipe(
		filter(isOfType(RequestProfileFollowingAction)),
		withLatestFrom(state$),
		mergeMap(([action, state]) =>
			ProfileService.getFollowing(action.payload.profile, state.auth.accessToken!).pipe(
				map((profiles) =>
					ProfileActions.recvFollowing({
						profile: action.payload.profile,
						following: profiles.map((profile) => profileResToIProfile(profile, Date.now())),
						receivedAt: Date.now(),
					}),
				),
				errorHandler(action),
			),
		),
	);

const getProfileFollowersEpic: Epic<AppActionsDto, Expirable<IReceiveProfileFollowersAction>, AppState> = (
	action$,
	state$,
) =>
	action$.pipe(
		filter(isOfType(RequestProfileFollowersAction)),
		withLatestFrom(state$),
		mergeMap(([action, state]) =>
			ProfileService.getFollowers(action.payload.profile, state.auth.accessToken!).pipe(
				map((profiles) =>
					ProfileActions.recvFollowers({
						profile: action.payload.profile,
						followers: profiles.map((profile) => profileResToIProfile(profile, Date.now())),
						receivedAt: Date.now(),
					}),
				),
				errorHandler(action),
			),
		),
	);

export const profileEpic = combineEpics(
	requestProfileEpic,
	createProfileEpic,
	createFirstProfileEpic,
	followProfileEpic,
	unfollowProfileEpic,
	getProfileFollowingEpic,
	getProfileFollowersEpic,
);
