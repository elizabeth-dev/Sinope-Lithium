import { AppActionsDto } from '../actions/app.actions';
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
import { AppState } from '@core/state/app.store';
import { ProfileService } from '@core/api/service/profile.service';
import { combineEpics, Epic } from 'redux-observable';
import { catchError, filter, map, mapTo, mergeMap, withLatestFrom } from 'rxjs/operators';
import { isOfType } from 'typesafe-actions';
import { of, throwError } from 'rxjs';
import { profileResToIProfile } from '@core/mapper/profile.mapper';

const requestProfileEpic: Epic<AppActionsDto, IReceiveProfilesAction, AppState> = (action$, state$) =>
	action$.pipe(
		filter(isOfType(RequestProfileAction)),
		withLatestFrom(state$),
		mergeMap(([{ payload }, state]) =>
			ProfileService.getById(payload.profile, payload.fromProfile, state.auth.accessToken!).pipe(
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
			),
		),
	);

const createProfileEpic: Epic<AppActionsDto, ICreatedProfileAction | IFailedCreateProfileAction, AppState> = (
	action$,
	state$,
) =>
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

					return throwError(err);
				}),
			),
		),
	);

const followProfileEpic: Epic<AppActionsDto, IFollowedProfileAction, AppState> = (action$, state$) =>
	action$.pipe(
		filter(isOfType(FollowProfileAction)),
		withLatestFrom(state$),
		mergeMap(([{ payload }, state]) =>
			ProfileService.follow(payload.toProfile, payload.fromProfile, state.auth.accessToken!).pipe(
				mapTo(ProfileActions.followed({ fromProfile: payload.fromProfile, toProfile: payload.toProfile })),
			),
		),
	);

const unfollowProfileEpic: Epic<AppActionsDto, IUnfollowedProfileAction, AppState> = (action$, state$) =>
	action$.pipe(
		filter(isOfType(UnfollowProfileAction)),
		withLatestFrom(state$),
		mergeMap(([{ payload }, state]) =>
			ProfileService.unfollow(payload.toProfile, payload.fromProfile, state.auth.accessToken!).pipe(
				mapTo(ProfileActions.unfollowed({ fromProfile: payload.fromProfile, toProfile: payload.toProfile })),
			),
		),
	);

const getProfileFollowingEpic: Epic<AppActionsDto, IReceiveProfileFollowingAction, AppState> = (action$, state$) =>
	action$.pipe(
		filter(isOfType(RequestProfileFollowingAction)),
		withLatestFrom(state$),
		mergeMap(([{ payload }, state]) =>
			ProfileService.getFollowing(payload.profile, state.auth.accessToken!).pipe(
				map((profiles) =>
					ProfileActions.recvFollowing({
						profile: payload.profile,
						following: profiles.map((profile) => profileResToIProfile(profile, Date.now())),
						receivedAt: Date.now(),
					}),
				),
			),
		),
	);

const getProfileFollowersEpic: Epic<AppActionsDto, IReceiveProfileFollowersAction, AppState> = (action$, state$) =>
	action$.pipe(
		filter(isOfType(RequestProfileFollowersAction)),
		withLatestFrom(state$),
		mergeMap(([{ payload }, state]) =>
			ProfileService.getFollowers(payload.profile, state.auth.accessToken!).pipe(
				map((profiles) =>
					ProfileActions.recvFollowers({
						profile: payload.profile,
						followers: profiles.map((profile) => profileResToIProfile(profile, Date.now())),
						receivedAt: Date.now(),
					}),
				),
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
