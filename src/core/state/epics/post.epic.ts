import {
	IReceivePostsAction,
	IReceiveProfilePostsAction,
	ISentPostAction,
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
import { AppState } from '@core/state/app.store';
import { Expirable } from '@shared/types/epic.type';
import { Require } from '@shared/types/require.type';
import { errorHandler } from '@shared/utils/epic.utils';
import { combineEpics, Epic } from 'redux-observable';
import { filter, map, mergeMap, withLatestFrom } from 'rxjs';
import { isOfType } from 'typesafe-actions';
import { AppActionsDto } from '../actions/app.actions';

const sendPostEpic: Epic<AppActionsDto, Expirable<ISentPostAction>, AppState> = (actions$, state$) =>
	actions$.pipe(
		filter(isOfType(SendPostAction)),
		withLatestFrom(state$),
		mergeMap(([action, state]) =>
			PostService.create(
				{
					content: action.payload.newPost.content,
					question: action.payload.newPost.question,
					profile: action.payload.newPost.profile,
				},
				state.auth.accessToken!,
			).pipe(
				map((post) =>
					PostActions.sent({
						post: postResToIPost(post),
						profile: postResToIProfile(post as Require<PostRes, 'profile'>, Date.now()),
						receivedAt: Date.now(),
						tmpId: action.payload.newPost.tmpId,
						question: post.question ? postResToIQuestion(post as Require<PostRes, 'question'>) : undefined,
					}),
				),
				errorHandler(action),
			),
		),
	);

const likePostEpic: Epic<AppActionsDto, Expirable<IReceivePostsAction>, AppState> = (actions$, state$) =>
	actions$.pipe(
		filter(isOfType(LikePostAction)),
		withLatestFrom(state$),
		mergeMap(([action, state]) =>
			PostService.like(action.payload.post, action.payload.fromProfile, state.auth.accessToken!).pipe(
				map((post) =>
					PostActions.receive({
						posts: [postResToIPost(post)],
						profiles: post.profile
							? [
									postResToIProfile(post as Require<PostRes, 'profile'>, Date.now()),
									...(post.profile.following
										? post.profile.following.map((follow) =>
												profileResToIProfile(follow, Date.now()),
										  )
										: []),
									...(post.profile.followers
										? post.profile.followers.map((follow) =>
												profileResToIProfile(follow, Date.now()),
										  )
										: []),
							  ]
							: [],
						questions: post.question ? [postResToIQuestion(post as Require<PostRes, 'question'>)] : [],
						receivedAt: Date.now(),
					}),
				),
				errorHandler(action),
			),
		),
	);

const unlikePostEpic: Epic<AppActionsDto, Expirable<IReceivePostsAction>, AppState> = (actions$, state$) =>
	actions$.pipe(
		filter(isOfType(UnlikePostAction)),
		withLatestFrom(state$),
		mergeMap(([action, state]) =>
			PostService.unlike(action.payload.post, action.payload.fromProfile, state.auth.accessToken!).pipe(
				map((post) =>
					PostActions.receive({
						posts: [postResToIPost(post)],
						profiles: post.profile
							? [
									postResToIProfile(post as Require<PostRes, 'profile'>, Date.now()),
									...(post.profile.following
										? post.profile.following.map((follow) =>
												profileResToIProfile(follow, Date.now()),
										  )
										: []),
									...(post.profile.followers
										? post.profile.followers.map((follow) =>
												profileResToIProfile(follow, Date.now()),
										  )
										: []),
							  ]
							: [],
						questions: post.question ? [postResToIQuestion(post as Require<PostRes, 'question'>)] : [],
						receivedAt: Date.now(),
					}),
				),
				errorHandler(action),
			),
		),
	);

const requestProfilePostsEpic: Epic<AppActionsDto, Expirable<IReceiveProfilePostsAction>, AppState> = (
	actions$,
	state$,
) =>
	actions$.pipe(
		filter(isOfType(RequestProfilePostsAction)),
		withLatestFrom(state$),
		mergeMap(([action, state]) =>
			PostService.getByProfile(action.payload.profile, state.auth.accessToken!).pipe(
				map((posts) =>
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
				),
				errorHandler(action),
			),
		),
	);

const requestPostEpic: Epic<AppActionsDto, Expirable<IReceivePostsAction>, AppState> = (actions$, state$) =>
	actions$.pipe(
		filter(isOfType(RequestPostAction)),
		withLatestFrom(state$),
		mergeMap(([action, state]) =>
			PostService.getById(action.payload.post, state.auth.accessToken!).pipe(
				map((post) =>
					PostActions.receive({
						posts: [postResToIPost(post)],
						profiles: post.profile
							? [
									postResToIProfile(post as Require<PostRes, 'profile'>, Date.now()),
									...(post.profile.following
										? post.profile.following.map((follow) =>
												profileResToIProfile(follow, Date.now()),
										  )
										: []),
									...(post.profile.followers
										? post.profile.followers.map((follow) =>
												profileResToIProfile(follow, Date.now()),
										  )
										: []),
							  ]
							: [],
						questions: post.question ? [postResToIQuestion(post as Require<PostRes, 'question'>)] : [],
						receivedAt: Date.now(),
					}),
				),
				errorHandler(action),
			),
		),
	);

export const postEpic = combineEpics(
	sendPostEpic,
	likePostEpic,
	unlikePostEpic,
	requestProfilePostsEpic,
	requestPostEpic,
);
