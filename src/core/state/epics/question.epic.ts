import {
	GetQuestionsByProfileAction,
	IReceiveQuestionsAction,
	IRemovedQuestionAction,
	ISentQuestionAction,
	QuestionActions,
	RemoveQuestionAction,
	SendQuestionAction,
} from '@actions/question.actions';
import { questionResToIQuestion } from '@core/mapper/question.mapper';
import { AppState } from '@core/state/app.store';
import { Expirable } from '@shared/types/epic.type';
import { errorHandler } from '@shared/utils/epic.utils';
import { combineEpics, Epic } from 'redux-observable';
import { filter, map, mergeMap, withLatestFrom } from 'rxjs';
import { isOfType } from 'typesafe-actions';
import { QuestionService } from '../../api/service/question.service';
import { AppActionsDto } from '../actions/app.actions';

const getQuestionsByProfileEpic: Epic<AppActionsDto, Expirable<IReceiveQuestionsAction>, AppState> = (
	action$,
	state$,
) =>
	action$.pipe(
		filter(isOfType(GetQuestionsByProfileAction)),
		withLatestFrom(state$),
		mergeMap(([action, state]) =>
			QuestionService.getByProfile(action.payload.profile, state.auth.accessToken!).pipe(
				map((questions) =>
					QuestionActions.receive({
						questions: questions.map((question) => questionResToIQuestion(question)),
						receivedAt: Date.now(),
					}),
				),
				errorHandler(action),
			),
		),
	);

const sendQuestionEpic: Epic<AppActionsDto, Expirable<ISentQuestionAction>, AppState> = (action$, state$) =>
	action$.pipe(
		filter(isOfType(SendQuestionAction)),
		withLatestFrom(state$),
		mergeMap(([action, state]) =>
			QuestionService.send(
				{
					anonymous: action.payload.newQuestion.anonymous,
					content: action.payload.newQuestion.content,
					from: action.payload.newQuestion.from,
					recipient: action.payload.newQuestion.recipient,
				},
				state.auth.accessToken!,
			).pipe(
				map((question) =>
					QuestionActions.sent({
						question: questionResToIQuestion(question),
						receivedAt: Date.now(),
						tmpId: action.payload.newQuestion.tmpId,
					}),
				),
				errorHandler(action),
			),
		),
	);

const removeQuestionEpic: Epic<AppActionsDto, Expirable<IRemovedQuestionAction>, AppState> = (action$, state$) =>
	action$.pipe(
		filter(isOfType(RemoveQuestionAction)),
		withLatestFrom(state$),
		mergeMap(([action, state]) =>
			QuestionService.remove(action.payload.question, state.auth.accessToken!).pipe(
				map(() => QuestionActions.removed({ question: action.payload.question })),
				errorHandler(action),
			),
		),
	);

export const questionEpic = combineEpics(getQuestionsByProfileEpic, sendQuestionEpic, removeQuestionEpic);
