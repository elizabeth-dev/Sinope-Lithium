import { AppActionsDto } from '@core/actions';
import {
	IReceiveProfilePostsAction,
	ISentPostAction,
	LikePostAction,
	PostActions,
	RequestProfilePostsAction,
	SendPostAction,
} from '@core/actions/post.actions';
import { AppState } from '@core/app.store';
import { PostService } from '@core/http/post.service';
import { ToastAndroid } from 'react-native';
import { combineEpics, Epic } from 'redux-observable';
import {
	filter,
	ignoreElements,
	map,
	mergeMap,
	tap,
	withLatestFrom,
} from 'rxjs/operators';
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

const likePostEpic: Epic<AppActionsDto> = (actions$) =>
	actions$.pipe(
		filter(isOfType(LikePostAction)),
		tap(({ payload }) =>
			ToastAndroid.show(`Liked post ${payload.post}`, ToastAndroid.SHORT),
		),
		ignoreElements(),
	);

const requestProfilePostsEpic: Epic<
	AppActionsDto,
	IReceiveProfilePostsAction,
	AppState
> = (actions$, state$) =>
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

export const postEpic = combineEpics(
	sendPostEpic,
	likePostEpic,
	requestProfilePostsEpic,
);
