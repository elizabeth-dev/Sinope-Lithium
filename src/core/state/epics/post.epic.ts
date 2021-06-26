import { AppActionsDto } from '../actions/app.actions';
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
import { AppState } from '@core/state/app.store';
import { PostService } from '@core/api/service/post.service';
import { combineEpics, Epic } from 'redux-observable';
import { filter, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { isOfType } from 'typesafe-actions';
import { postResToIPost } from '@core/mapper/post.mapper';
import { postResToIProfile, profileResToIProfile } from '@core/mapper/profile.mapper';
import { Require } from '@shared/types/require.type';
import { PostRes } from '@core/api/model/api';
import { postResToIQuestion } from '@core/mapper/question.mapper';

const sendPostEpic: Epic<AppActionsDto, ISentPostAction, AppState> = (actions$, state$) =>
	actions$.pipe(
		filter(isOfType(SendPostAction)),
		withLatestFrom(state$),
		mergeMap(([{ payload }, state]) =>
			PostService.create(
				{
					content: payload.newPost.content,
					question: payload.newPost.question,
					profile: payload.newPost.profile,
				},
				state.auth.accessToken!,
			).pipe(
				map((post) =>
					PostActions.sent({
						post: postResToIPost(post),
						profile: postResToIProfile(post as Require<PostRes, 'profile'>, Date.now()),
						receivedAt: Date.now(),
						tmpId: payload.newPost.tmpId,
						question: post.question ? postResToIQuestion(post as Require<PostRes, 'question'>) : undefined,
					}),
				),
			),
		),
	);

const likePostEpic: Epic<AppActionsDto, IReceivePostsAction, AppState> = (actions$, state$) =>
	actions$.pipe(
		filter(isOfType(LikePostAction)),
		withLatestFrom(state$),
		mergeMap(([{ payload }, state]) =>
			PostService.like(payload.post, payload.fromProfile, state.auth.accessToken!).pipe(
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
			),
		),
	);

const unlikePostEpic: Epic<AppActionsDto, IReceivePostsAction, AppState> = (actions$, state$) =>
	actions$.pipe(
		filter(isOfType(UnlikePostAction)),
		withLatestFrom(state$),
		mergeMap(([{ payload }, state]) =>
			PostService.unlike(payload.post, payload.fromProfile, state.auth.accessToken!).pipe(
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
			),
		),
	);

const requestProfilePostsEpic: Epic<AppActionsDto, IReceiveProfilePostsAction, AppState> = (actions$, state$) =>
	actions$.pipe(
		filter(isOfType(RequestProfilePostsAction)),
		withLatestFrom(state$),
		mergeMap(([{ payload }, state]) =>
			PostService.getByProfile(payload.profile, state.auth.accessToken!).pipe(
				map((posts) =>
					PostActions.receiveFromProfile({
						reqProfile: payload.profile,
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
			),
		),
	);

const requestPostEpic: Epic<AppActionsDto, IReceivePostsAction, AppState> = (actions$, state$) =>
	actions$.pipe(
		filter(isOfType(RequestPostAction)),
		withLatestFrom(state$),
		mergeMap(([{ payload }, state]) =>
			PostService.getById(payload.post, state.auth.accessToken!).pipe(
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
