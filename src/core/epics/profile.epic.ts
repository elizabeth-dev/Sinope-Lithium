import { AppActionsDto } from '@core/actions';
import {
	IReceiveProfilesAction,
	ProfileActions,
	RequestProfileAction,
} from '@core/actions/profile.actions';
import { AppState } from '@core/app.store';
import { ProfileService } from '@core/http/profile.service';
import { combineEpics, Epic } from 'redux-observable';
import { filter, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { isOfType } from 'typesafe-actions';

const requestProfileEpic: Epic<
	AppActionsDto,
	IReceiveProfilesAction,
	AppState
> = (action$, state$) =>
	action$.pipe(
		filter(isOfType(RequestProfileAction)),
		withLatestFrom(state$),
		mergeMap(([{ payload }, state]) =>
			ProfileService.getById(
				payload.profile,
				state.auth.accessToken as string,
			).pipe(
				map((profile) => {
					console.log(profile);
					return ProfileActions.receive([profile], Date.now());
				}),
			),
		),
	);

export const profileEpic = combineEpics(requestProfileEpic);
