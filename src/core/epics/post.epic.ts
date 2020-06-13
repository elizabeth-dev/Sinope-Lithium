import { AppActionsDto } from '@core/actions';
import { ISentPostAction, LikePostAction, PostActions, SendPostAction } from '@core/actions/post.actions';
import { mockedPosts } from '@core/mocks/post/commonPosts.mock';
import { ToastAndroid } from 'react-native';
import { combineEpics, Epic } from 'redux-observable';
import { filter, ignoreElements, map, tap } from 'rxjs/operators';
import { isOfType } from 'typesafe-actions';

const sendPostEpic: Epic<AppActionsDto, ISentPostAction> = (actions$) =>
	actions$.pipe(
		filter(isOfType(SendPostAction)),
		map(({ payload }) => {
			ToastAndroid.show(`Sent post ${payload.newPost.tmpId}`, ToastAndroid.SHORT);
			return PostActions.sent(
				{ ...mockedPosts[0], id: Date.now().toString(), content: payload.newPost.content },
				Date.now(),
				payload.newPost.tmpId,
			);
		}),
	);

const likePostEpic: Epic<AppActionsDto> = (actions$) =>
	actions$.pipe(
		filter(isOfType(LikePostAction)),
		tap(({ payload }) => ToastAndroid.show(`Liked post ${payload.post}`, ToastAndroid.SHORT)),
		ignoreElements(),
	);

export const postEpic = combineEpics(sendPostEpic, likePostEpic);
