import { IReceiveTimelineAction, RequestTimelineAction, TimelineActions } from '@actions/timeline.actions';
import { PostRes } from '@core/api/model/api';
import { ProfileService } from '@core/api/service/profile.service';
import { postResToIPost } from '@core/mapper/post.mapper';
import { postResToIProfile } from '@core/mapper/profile.mapper';
import { postResToIQuestion } from '@core/mapper/question.mapper';
import { AppState } from '@core/state/app.store';
import { Expirable } from '@shared/types/epic.type';
import { Require } from '@shared/types/require.type';
import { errorHandler } from '@shared/utils/epic.utils';
import { combineEpics, Epic } from 'redux-observable';
import { filter, map, mergeMap, withLatestFrom } from 'rxjs';
import { isOfType } from 'typesafe-actions';
import { AppActionsDto } from '../actions/app.actions';

const loadTimelineEpic: Epic<AppActionsDto, Expirable<IReceiveTimelineAction>, AppState> = (action$, state$) =>
	action$.pipe(
		filter(isOfType(RequestTimelineAction)),
		withLatestFrom(state$),
		mergeMap(([action, state]) =>
			ProfileService.timeline(action.payload.profile, state.auth.accessToken!).pipe(
				map((posts) =>
					TimelineActions.receive({
						posts: posts.map(postResToIPost),
						profiles: posts
							.filter((post): post is Require<PostRes, 'profile'> => !!post.profile)
							.map((post) => postResToIProfile(post, Date.now())),
						questions: posts
							.filter((post): post is Require<PostRes, 'question'> => !!post.question)
							.map(postResToIQuestion),
						fromProfile: action.payload.profile,
						receivedAt: Date.now(),
					}),
				),
				errorHandler(action),
			),
		),
	);

export const timelineEpic = combineEpics(loadTimelineEpic);
