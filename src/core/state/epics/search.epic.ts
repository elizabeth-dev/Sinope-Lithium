import { IReceiveSearchAction, SearchAction, SearchActions } from '@actions/search.actions';
import { PostRes } from '@core/api/model/api';
import { postResToIPost } from '@core/mapper/post.mapper';
import { postResToIProfile, profileResToIProfile } from '@core/mapper/profile.mapper';
import { postResToIQuestion } from '@core/mapper/question.mapper';
import { Expirable } from '@shared/types/epic.type';
import { Require } from '@shared/types/require.type';
import { errorHandler } from '@shared/utils/epic.utils';
import { combineEpics, Epic } from 'redux-observable';
import { filter, map, mergeMap, withLatestFrom } from 'rxjs';
import { isOfType } from 'typesafe-actions';
import { SearchService } from '../../api/service/search.service';
import { AppActionsDto } from '../actions/app.actions';
import { AppState } from '../app.store';

const searchReqEpic: Epic<AppActionsDto, Expirable<IReceiveSearchAction>, AppState> = (action$, state$) =>
	action$.pipe(
		filter(isOfType(SearchAction)),
		withLatestFrom(state$),
		mergeMap(([action, state]) =>
			SearchService.search(action.payload.searchTerm, state.auth.accessToken!).pipe(
				map(({ posts, profiles }) =>
					SearchActions.receiveSearch({
						profiles: [
							...profiles.map((profile) => profileResToIProfile(profile, Date.now())),
							...posts
								.filter((post): post is Require<PostRes, 'profile'> => !!post.profile)
								.map((post) => postResToIProfile(post, Date.now())),
						],
						posts: posts.map((post) => postResToIPost(post)),
						questions: posts
							.filter((post): post is Require<PostRes, 'question'> => !!post.question)
							.map(postResToIQuestion),
						searchTerm: action.payload.searchTerm,
						receivedAt: Date.now(),
					}),
				),
				errorHandler(action),
			),
		),
	);

export const searchEpic = combineEpics(searchReqEpic);
