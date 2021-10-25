import { AuthActions } from '@actions/auth.actions';
import {
	GetQuestionsByProfileAction,
	IGetQuestionsByProfileAction,
	IRemoveQuestionAction,
	ISendQuestionAction,
	QuestionActions,
	RemoveQuestionAction,
	SendQuestionAction,
} from '@actions/question.actions';
import { questionResToIQuestion } from '@core/mapper/question.mapper';
import { call, put, select, takeEvery } from '@redux-saga/core/effects';
import { CallReturn } from '@shared/types/saga.type';
import { QuestionService } from '../../api/service/question.service';
import { fromAuth } from '../selectors/auth.selectors';

function* getQuestionsByProfileWorker(action: IGetQuestionsByProfileAction) {
	try {
		const accessToken: string = yield select(fromAuth.accessToken);

		const questions: CallReturn<typeof QuestionService.getByProfile> = yield call(
			QuestionService.getByProfile,
			action.payload.profile,
			accessToken,
		);

		yield put(
			QuestionActions.receive({
				profile: action.payload.profile,
				questions: questions.map((question) => questionResToIQuestion(question)),
				receivedAt: Date.now(),
			}),
		);
	} catch (error: any) {
		if (error.status === 401) yield put(AuthActions.expired({ action }));
	}
}

function* sendQuestionWorker(action: ISendQuestionAction) {
	try {
		const accessToken: string = yield select(fromAuth.accessToken);

		const question: CallReturn<typeof QuestionService.send> = yield call(
			QuestionService.send,
			{
				anonymous: action.payload.newQuestion.anonymous,
				content: action.payload.newQuestion.content,
				from: action.payload.newQuestion.from,
				recipient: action.payload.newQuestion.recipient,
			},
			accessToken,
		);

		yield put(
			QuestionActions.sent({
				question: questionResToIQuestion(question),
				receivedAt: Date.now(),
				tmpId: action.payload.newQuestion.tmpId,
			}),
		);
	} catch (error: any) {
		if (error.status === 401) yield put(AuthActions.expired({ action }));
	}
}

function* removeQuestionWorker(action: IRemoveQuestionAction) {
	try {
		const accessToken: string = yield select(fromAuth.accessToken);

		yield call(QuestionService.remove, action.payload.question, accessToken);

		yield put(QuestionActions.removed({ question: action.payload.question }));
	} catch (error: any) {
		if (error.status === 401) yield put(AuthActions.expired({ action }));
	}
}

export function* questionSaga() {
	yield takeEvery(GetQuestionsByProfileAction, getQuestionsByProfileWorker);
	yield takeEvery(SendQuestionAction, sendQuestionWorker);
	yield takeEvery(RemoveQuestionAction, removeQuestionWorker);
}
