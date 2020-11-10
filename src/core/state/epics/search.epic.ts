import { combineEpics, Epic } from 'redux-observable';
import { AppActionsDto } from '../actions';
import { IReceiveSearchAction, SearchAction, SearchActions } from '../actions/search.actions';
import { filter, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { isOfType } from 'typesafe-actions';
import { SearchService } from '../../http/search.service';
import { AppState } from '../app.store';

const searchReqEpic: Epic<AppActionsDto, IReceiveSearchAction, AppState> = (action$,
	state$) => action$.pipe(filter(isOfType(SearchAction)),
	withLatestFrom(state$),
	mergeMap(([{ payload }, state]) => SearchService.search(payload.searchTerm,
		state.auth.accessToken!,
		)
		.pipe(map(res => SearchActions.receiveSearch(res.profiles,
			res.posts,
			payload.searchTerm,
			Date.now(),
		)))),
);

export const searchEpic = combineEpics(searchReqEpic);
