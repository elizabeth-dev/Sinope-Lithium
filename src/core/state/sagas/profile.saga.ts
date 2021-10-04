import { AuthActions } from '@actions/auth.actions';
import {
	CreateFirstProfileAction,
	CreateProfileAction,
	FollowProfileAction,
	ICreateFirstProfileAction,
	ICreateProfileAction,
	IFollowProfileAction,
	IRequestProfileAction,
	IRequestProfileFollowersAction,
	IRequestProfileFollowingAction,
	IUnfollowProfileAction,
	ProfileActions,
	RequestProfileAction,
	RequestProfileFollowersAction,
	RequestProfileFollowingAction,
	UnfollowProfileAction,
} from '@actions/profile.actions';
import { ProfileService } from '@core/api/service/profile.service';
import { profileResToIProfile } from '@core/mapper/profile.mapper';
import { call, put, select, takeEvery } from '@redux-saga/core/effects';
import { CallReturn } from '@shared/types/saga.type';
import { fromAuth } from '../selectors/auth.selectors';

function* requestProfileWorker(action: IRequestProfileAction) {
	try {
		const accessToken: string = yield select(fromAuth.accessToken);

		const profile: CallReturn<typeof ProfileService.getById> = yield call(
			ProfileService.getById,
			action.payload.profile,
			action.payload.fromProfile,
			accessToken,
		);

		yield put(
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
		);
	} catch (error: any) {
		if (error.status === 401) yield put(AuthActions.expired({ action }));
	}
}

function* createProfileWorker(action: ICreateProfileAction) {
	try {
		const accessToken: string = yield select(fromAuth.accessToken);

		const profile: CallReturn<typeof ProfileService.create> = yield call(
			ProfileService.create,
			action.payload.newProfile,
			accessToken,
		);

		yield put(
			ProfileActions.created({
				profile: profileResToIProfile(profile, Date.now()),
				receivedAt: Date.now(),
			}),
		);
	} catch (error: any) {
		if (error.status === 401) yield put(AuthActions.expired({ action }));
	}
}

function* createFirstProfileWorker(action: ICreateFirstProfileAction) {
	try {
		const accessToken: string = yield select(fromAuth.accessToken);

		const profile: CallReturn<typeof ProfileService.create> = yield call(
			ProfileService.create,
			action.payload.newProfile,
			accessToken,
		);

		yield put(
			ProfileActions.createdFirst({
				profile: profileResToIProfile(profile, Date.now()),
				receivedAt: Date.now(),
			}),
		);
	} catch (error: any) {
		if (error.status === 401) yield put(ProfileActions.failedCreateFirst());
	}
}

function* followProfileWorker(action: IFollowProfileAction) {
	try {
		const accessToken: string = yield select(fromAuth.accessToken);

		yield call(ProfileService.follow, action.payload.toProfile, action.payload.fromProfile, accessToken);

		yield put(
			ProfileActions.followed({
				fromProfile: action.payload.fromProfile,
				toProfile: action.payload.toProfile,
			}),
		);
	} catch (error: any) {
		if (error.status === 401) yield put(AuthActions.expired({ action }));
	}
}

function* unfollowProfileWorker(action: IUnfollowProfileAction) {
	try {
		const accessToken: string = yield select(fromAuth.accessToken);

		yield call(ProfileService.unfollow, action.payload.toProfile, action.payload.fromProfile, accessToken);

		yield put(
			ProfileActions.unfollowed({
				fromProfile: action.payload.fromProfile,
				toProfile: action.payload.toProfile,
			}),
		);
	} catch (error: any) {
		if (error.status === 401) yield put(AuthActions.expired({ action }));
	}
}

function* requestProfileFollowingWorker(action: IRequestProfileFollowingAction) {
	try {
		const accessToken: string = yield select(fromAuth.accessToken);

		const profiles: CallReturn<typeof ProfileService.getFollowing> = yield call(
			ProfileService.getFollowing,
			action.payload.profile,
			accessToken,
		);

		yield put(
			ProfileActions.recvFollowing({
				profile: action.payload.profile,
				following: profiles.map((profile) => profileResToIProfile(profile, Date.now())),
				receivedAt: Date.now(),
			}),
		);
	} catch (error: any) {
		if (error.status === 401) yield put(AuthActions.expired({ action }));
	}
}

function* requestProfileFollowersWorker(action: IRequestProfileFollowersAction) {
	try {
		const accessToken: string = yield select(fromAuth.accessToken);

		const profiles: CallReturn<typeof ProfileService.getFollowers> = yield call(
			ProfileService.getFollowers,
			action.payload.profile,
			accessToken,
		);

		yield put(
			ProfileActions.recvFollowers({
				profile: action.payload.profile,
				followers: profiles.map((profile) => profileResToIProfile(profile, Date.now())),
				receivedAt: Date.now(),
			}),
		);
	} catch (error: any) {
		if (error.status === 401) yield put(AuthActions.expired({ action }));
	}
}

export function* profileSaga() {
	yield takeEvery(RequestProfileAction, requestProfileWorker);
	yield takeEvery(CreateProfileAction, createProfileWorker);
	yield takeEvery(CreateFirstProfileAction, createFirstProfileWorker);
	yield takeEvery(FollowProfileAction, followProfileWorker);
	yield takeEvery(UnfollowProfileAction, unfollowProfileWorker);
	yield takeEvery(RequestProfileFollowingAction, requestProfileFollowingWorker);
	yield takeEvery(RequestProfileFollowersAction, requestProfileFollowersWorker);
}
