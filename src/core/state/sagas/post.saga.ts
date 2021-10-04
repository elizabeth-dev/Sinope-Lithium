import { AuthActions } from '@actions/auth.actions';
import {
	ILikePostAction,
	IRequestPostAction,
	IRequestProfilePostsAction,
	ISendPostAction,
	IUnlikePostAction,
	LikePostAction,
	PostActions,
	RequestPostAction,
	RequestProfilePostsAction,
	SendPostAction,
	UnlikePostAction,
} from '@actions/post.actions';
import { PostRes } from '@core/api/model/api';
import { PostService } from '@core/api/service/post.service';
import { postResToIPost } from '@core/mapper/post.mapper';
import { postResToIProfile, profileResToIProfile } from '@core/mapper/profile.mapper';
import { postResToIQuestion } from '@core/mapper/question.mapper';
import { call, put, select, takeEvery } from '@redux-saga/core/effects';
import { Require } from '@shared/types/require.type';
import { CallReturn } from '@shared/types/saga.type';
import { fromAuth } from '../selectors/auth.selectors';

function* sendPostWorker(action: ISendPostAction) {
	try {
		const accessToken: string = yield select(fromAuth.accessToken);

		const { newPost } = action.payload;

		const post: CallReturn<typeof PostService.create> = yield call(
			PostService.create,
			{
				content: newPost.content,
				question: newPost.question,
				profile: newPost.profile,
			},
			accessToken,
		);

		yield put(
			PostActions.sent({
				post: postResToIPost(post),
				profile: postResToIProfile(post as Require<PostRes, 'profile'>, Date.now()),
				receivedAt: Date.now(),
				tmpId: newPost.tmpId,
				question: post.question ? postResToIQuestion(post as Require<PostRes, 'question'>) : undefined,
			}),
		);
	} catch (error: any) {
		if (error.status === 401) yield put(AuthActions.expired({ action }));
	}
}

function* likePostWorker(action: ILikePostAction) {
	try {
		const accessToken: string = yield select(fromAuth.accessToken);

		const post: CallReturn<typeof PostService.like> = yield call(
			PostService.like,
			action.payload.post,
			action.payload.fromProfile,
			accessToken,
		);

		yield put(
			PostActions.receive({
				posts: [postResToIPost(post)],
				profiles: post.profile
					? [
							postResToIProfile(post as Require<PostRes, 'profile'>, Date.now()),
							...(post.profile.following
								? post.profile.following.map((follow) => profileResToIProfile(follow, Date.now()))
								: []),
							...(post.profile.followers
								? post.profile.followers.map((follow) => profileResToIProfile(follow, Date.now()))
								: []),
					  ]
					: [],
				questions: post.question ? [postResToIQuestion(post as Require<PostRes, 'question'>)] : [],
				receivedAt: Date.now(),
			}),
		);
	} catch (error: any) {
		if (error.status === 401) yield put(AuthActions.expired({ action }));
	}
}

function* unlikePostWorker(action: IUnlikePostAction) {
	try {
		const accessToken: string = yield select(fromAuth.accessToken);

		const post: CallReturn<typeof PostService.unlike> = yield call(
			PostService.unlike,
			action.payload.post,
			action.payload.fromProfile,
			accessToken,
		);

		yield put(
			PostActions.receive({
				posts: [postResToIPost(post)],
				profiles: post.profile
					? [
							postResToIProfile(post as Require<PostRes, 'profile'>, Date.now()),
							...(post.profile.following
								? post.profile.following.map((follow) => profileResToIProfile(follow, Date.now()))
								: []),
							...(post.profile.followers
								? post.profile.followers.map((follow) => profileResToIProfile(follow, Date.now()))
								: []),
					  ]
					: [],
				questions: post.question ? [postResToIQuestion(post as Require<PostRes, 'question'>)] : [],
				receivedAt: Date.now(),
			}),
		);
	} catch (error: any) {
		if (error.status === 401) yield put(AuthActions.expired({ action }));
	}
}

function* requestProfilePostsWorker(action: IRequestProfilePostsAction) {
	try {
		const accessToken: string = yield select(fromAuth.accessToken);

		const posts: CallReturn<typeof PostService.getByProfile> = yield call(
			PostService.getByProfile,
			action.payload.profile,
			accessToken,
		);

		yield put(
			PostActions.receiveFromProfile({
				reqProfile: action.payload.profile,
				posts: posts.map(postResToIPost),
				profiles: posts
					.filter((post): post is Require<PostRes, 'profile'> => !!post.profile)
					.map((post) => postResToIProfile(post, Date.now())),
				questions: posts
					.filter((post): post is Require<PostRes, 'question'> => !!post.question)
					.map(postResToIQuestion),
				receivedAt: Date.now(),
			}),
		);
	} catch (error: any) {
		if (error.status === 401) yield put(AuthActions.expired({ action }));
	}
}

function* requestPostWorker(action: IRequestPostAction) {
	try {
		const accessToken: string = yield select(fromAuth.accessToken);

		const post: CallReturn<typeof PostService.getById> = yield call(
			PostService.getById,
			action.payload.post,
			accessToken,
		);

		yield put(
			PostActions.receive({
				posts: [postResToIPost(post)],
				profiles: post.profile
					? [
							postResToIProfile(post as Require<PostRes, 'profile'>, Date.now()),
							...(post.profile.following
								? post.profile.following.map((follow) => profileResToIProfile(follow, Date.now()))
								: []),
							...(post.profile.followers
								? post.profile.followers.map((follow) => profileResToIProfile(follow, Date.now()))
								: []),
					  ]
					: [],
				questions: post.question ? [postResToIQuestion(post as Require<PostRes, 'question'>)] : [],
				receivedAt: Date.now(),
			}),
		);
	} catch (error: any) {
		if (error.status === 401) yield put(AuthActions.expired({ action }));
	}
}

export function* postSaga() {
	yield takeEvery(SendPostAction, sendPostWorker);
	yield takeEvery(LikePostAction, likePostWorker);
	yield takeEvery(UnlikePostAction, unlikePostWorker);
	yield takeEvery(RequestProfilePostsAction, requestProfilePostsWorker);
	yield takeEvery(RequestPostAction, requestPostWorker);
}
