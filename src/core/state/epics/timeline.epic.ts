import { AppActionsDto } from '../actions/app.actions';
import {
	IReceiveTimelineAction, RequestTimelineAction, TimelineActions,
} from '@core/state/actions/timeline.actions';
import { AppState } from '@core/state/app.store';
import { ProfileService } from '@core/http/profile.service';
import { combineEpics, Epic } from 'redux-observable';
import { filter, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { isOfType } from 'typesafe-actions';

const loadTimelineEpic: Epic<AppActionsDto,
	IReceiveTimelineAction,
	AppState> = (action$, state$) =>
	action$.pipe(
		filter(isOfType(RequestTimelineAction)),
		withLatestFrom(state$),
		mergeMap(([action, state]) =>
			ProfileService.timeline(action.payload.profile, state.auth.accessToken!).pipe(
				map((posts) =>
					TimelineActions.receive(
						posts,
						action.payload.profile,
						Date.now(),
					),
				),
			),
		),
	);

export const timelineEpic = combineEpics(loadTimelineEpic);
