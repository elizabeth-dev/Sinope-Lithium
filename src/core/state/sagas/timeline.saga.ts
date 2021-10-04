import { AuthActions } from '@actions/auth.actions';
import { IRequestTimelineAction, RequestTimelineAction, TimelineActions } from '@actions/timeline.actions';
import { PostRes } from '@core/api/model/api';
import { ProfileService } from '@core/api/service/profile.service';
import { postResToIPost } from '@core/mapper/post.mapper';
import { postResToIProfile } from '@core/mapper/profile.mapper';
import { postResToIQuestion } from '@core/mapper/question.mapper';
import { call, put, select, takeEvery } from '@redux-saga/core/effects';
import { Require } from '@shared/types/require.type';
import { CallReturn } from '@shared/types/saga.type';
import { fromAuth } from '../selectors/auth.selectors';

function* requestTimelineWorker(action: IRequestTimelineAction) {
	try {
		const accessToken: string = yield select(fromAuth.accessToken);

		const posts: CallReturn<typeof ProfileService.timeline> = yield call(
			ProfileService.timeline,
			action.payload.profile,
			accessToken,
		);

		yield put(
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
		);
	} catch (error: any) {
		if (error.status === 401) yield put(AuthActions.expired({ action }));
	}
}

export function* timelineSaga() {
	yield takeEvery(RequestTimelineAction, requestTimelineWorker);
}
