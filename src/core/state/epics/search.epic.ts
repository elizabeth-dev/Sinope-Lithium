import { combineEpics, Epic } from 'redux-observable';
import { AppActionsDto } from '../actions/app.actions';
import { IReceiveSearchAction, SearchAction, SearchActions } from '../actions/search.actions';
import { filter, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { isOfType } from 'typesafe-actions';
import { SearchService } from '../../api/service/search.service';
import { AppState } from '../app.store';
import { postResToIPost } from '@core/mapper/post.mapper';
import { postResToIProfile, profileResToIProfile } from '@core/mapper/profile.mapper';
import { Require } from '@shared/types/require.type';
import { PostRes } from '@core/api/model/api';
import { postResToIQuestion } from '@core/mapper/question.mapper';

const searchReqEpic: Epic<AppActionsDto, IReceiveSearchAction, AppState> = (action$, state$) =>
	action$.pipe(
		filter(isOfType(SearchAction)),
		withLatestFrom(state$),
		mergeMap(([{ payload }, state]) =>
			SearchService.search(payload.searchTerm, state.auth.accessToken!).pipe(
				map(({ posts, profiles }) =>
					SearchActions.receiveSearch(
						[
							...profiles.map((profile) => profileResToIProfile(profile, Date.now())),
							...posts
								.filter((post): post is Require<PostRes, 'profile'> => !!post.profile)
								.map((post) => postResToIProfile(post, Date.now())),
						],
						posts.map((post) => postResToIPost(post)),
						posts
							.filter((post): post is Require<PostRes, 'question'> => !!post.question)
							.map(postResToIQuestion),
						payload.searchTerm,
						Date.now(),
					),
				),
			),
		),
	);

export const searchEpic = combineEpics(searchReqEpic);
