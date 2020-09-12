import { AppActionsDto } from '@core/actions';
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
} from '@core/actions/post.actions';
import { AppState } from '@core/app.store';
import { PostService } from '@core/http/post.service';
import { combineEpics, Epic } from 'redux-observable';
import { filter, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { isOfType } from 'typesafe-actions';

const sendPostEpic: Epic<AppActionsDto, ISentPostAction, AppState> = (
	actions$,
	state$,
) =>
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
				state.auth.accessToken as string,
			).pipe(
				map((post) =>
					PostActions.sent(post, Date.now(), payload.newPost.tmpId),
				),
			),
		),
	);

const likePostEpic: Epic<AppActionsDto, IReceivePostsAction, AppState> = (
	actions$,
	state$,
) =>
	actions$.pipe(
		filter(isOfType(LikePostAction)),
		withLatestFrom(state$),
		mergeMap(([{ payload }, state]) =>
			PostService.like(
				payload.post,
				payload.fromProfile,
				state.auth.accessToken as string,
			).pipe(map((post) => PostActions.receive([post], Date.now()))),
		),
	);

const unlikePostEpic: Epic<AppActionsDto, IReceivePostsAction, AppState> = (
	actions$,
	state$,
) =>
	actions$.pipe(
		filter(isOfType(UnlikePostAction)),
		withLatestFrom(state$),
		mergeMap(([{ payload }, state]) =>
			PostService.unlike(
				payload.post,
				payload.fromProfile,
				state.auth.accessToken as string,
			).pipe(map((post) => PostActions.receive([post], Date.now()))),
		),
	);

const requestProfilePostsEpic: Epic<AppActionsDto,
	IReceiveProfilePostsAction,
	AppState> = (actions$, state$) =>
	actions$.pipe(
		filter(isOfType(RequestProfilePostsAction)),
		withLatestFrom(state$),
		mergeMap(([{ payload }, state]) =>
			PostService.getByProfile(
				payload.profile,
				state.auth.accessToken as string,
			).pipe(
				map((posts) =>
					PostActions.receiveFromProfile(
						payload.profile,
						posts,
						Date.now(),
					),
				),
			),
		),
	);

const requestPostEpic: Epic<AppActionsDto, IReceivePostsAction, AppState> = (
	actions$,
	state$,
) =>
	actions$.pipe(
		filter(isOfType(RequestPostAction)),
		withLatestFrom(state$),
		mergeMap(([{ payload }, state]) =>
			PostService.getById(
				payload.post,
				state.auth.accessToken as string,
			).pipe(map((posts) => PostActions.receive([posts], Date.now()))),
		),
	);

export const postEpic = combineEpics(
	sendPostEpic,
	likePostEpic,
	unlikePostEpic,
	requestProfilePostsEpic,
	requestPostEpic,
);
