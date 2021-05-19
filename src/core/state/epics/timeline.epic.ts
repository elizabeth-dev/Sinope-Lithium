import { AppActionsDto } from '../actions/app.actions';
import { IReceiveTimelineAction, RequestTimelineAction, TimelineActions } from '@core/state/actions/timeline.actions';
import { AppState } from '@core/state/app.store';
import { ProfileService } from '@core/api/service/profile.service';
import { combineEpics, Epic } from 'redux-observable';
import { filter, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { isOfType } from 'typesafe-actions';
import { postResToIPost } from '@core/mapper/post.mapper';
import { Require } from '@shared/types/require.type';
import { PostRes } from '@core/api/model/api';
import { postResToIProfile } from '@core/mapper/profile.mapper';
import { postResToIQuestion } from '@core/mapper/question.mapper';

const loadTimelineEpic: Epic<AppActionsDto, IReceiveTimelineAction, AppState> = (action$, state$) =>
	action$.pipe(
		filter(isOfType(RequestTimelineAction)),
		withLatestFrom(state$),
		mergeMap(([action, state]) =>
			ProfileService.timeline(action.payload.profile, state.auth.accessToken!).pipe(
				map((posts) =>
					TimelineActions.receive(
						posts.map(postResToIPost),
						posts
							.filter((post): post is Require<PostRes, 'profile'> => !!post.profile)
							.map((post) => postResToIProfile(post, Date.now())),
						posts
							.filter((post): post is Require<PostRes, 'question'> => !!post.question)
							.map(postResToIQuestion),
						action.payload.profile,
						Date.now(),
					),
				),
			),
		),
	);

export const timelineEpic = combineEpics(loadTimelineEpic);
