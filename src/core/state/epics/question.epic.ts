import { AppActionsDto } from '../actions/app.actions';
import { AppState } from '@core/state/app.store';
import { combineEpics, Epic } from 'redux-observable';
import { filter, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { isOfType } from 'typesafe-actions';
import {
	GetQuestionsByProfileAction,
	IReceiveQuestionsAction,
	IRemovedQuestionAction,
	ISentQuestionAction,
	QuestionActions,
	RemoveQuestionAction,
	SendQuestionAction,
} from '../actions/question.actions';
import { QuestionService } from '../../http/question.service';

const getQuestionsByProfileEpic: Epic<AppActionsDto, IReceiveQuestionsAction, AppState> = (
	action$,
	state$) => action$.pipe(filter(isOfType(GetQuestionsByProfileAction)),
	withLatestFrom(state$),
	mergeMap(([{ payload }, state]) => QuestionService.getByProfile(payload.profile, state.auth.accessToken!)),
	map((questions) => QuestionActions.receive(questions, Date.now())),
);

const sendQuestionEpic: Epic<AppActionsDto, ISentQuestionAction, AppState> = (action$, state$) => action$.pipe(filter(
	isOfType(SendQuestionAction)),
	withLatestFrom(state$),
	mergeMap(([{ payload }, state]) => QuestionService.send({
			anonymous: payload.newQuestion.anonymous,
			content: payload.newQuestion.content,
			from: payload.newQuestion.from,
			recipient: payload.newQuestion.recipient,
		}, state.auth.accessToken!)
		.pipe(map((question) => QuestionActions.sent(question, Date.now(), payload.newQuestion.tmpId)))),
);

const removeQuestionEpic: Epic<AppActionsDto, IRemovedQuestionAction, AppState> = (action$, state$) => action$.pipe(
	filter(isOfType(RemoveQuestionAction)),
	withLatestFrom(state$),
	mergeMap(([{ payload }, state]) => QuestionService.remove(payload.question, state.auth.accessToken!)
		.pipe(map(() => QuestionActions.removed(payload.question)))),
);

export const questionEpic = combineEpics(getQuestionsByProfileEpic, sendQuestionEpic, removeQuestionEpic);
