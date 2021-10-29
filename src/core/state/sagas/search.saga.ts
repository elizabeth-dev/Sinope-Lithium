import { AuthActions } from '@actions/auth.actions';
import { ISearchAction, SearchAction, SearchActions } from '@actions/search.actions';
import { PostRes } from '@core/api/model/api';
import { postResToIPost } from '@core/mapper/post.mapper';
import { postResToIProfile, profileResToIProfile } from '@core/mapper/profile.mapper';
import { postResToIQuestion } from '@core/mapper/question.mapper';
import { call, put, select, takeEvery } from '@redux-saga/core/effects';
import { Require } from '@shared/types/require.type';
import { CallReturn } from '@shared/types/saga.type';
import { SearchService } from '../../api/service/search.service';
import { fromAuth } from '../selectors/auth.selectors';

function* searchWorker(action: ISearchAction) {
	try {
		const accessToken: string = yield select(fromAuth.accessToken);

		const { posts, profiles }: CallReturn<typeof SearchService.search> = yield call(
			SearchService.search,
			action.payload.searchTerm,
			accessToken,
		);

		yield put(
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
				result: { posts: posts.map((el) => el.id), profiles: profiles.map((el) => el.id) },
				searchTerm: action.payload.searchTerm,
				receivedAt: Date.now(),
			}),
		);
	} catch (error: any) {
		if (error.status === 401) yield put(AuthActions.expired({ action }));
	}
}

export function* searchSaga() {
	yield takeEvery(SearchAction, searchWorker);
}
