import { INewQuestion } from '@shared/types/entities/question.interface';
import {
	FailedSentQuestionAction,
	QuestionActionsDto,
	SendQuestionAction,
	SentQuestionAction,
} from '@actions/question.actions';

export type PendingQuestionsState = INewQuestion[];

const initialState: PendingQuestionsState = [];

export function pendingQuestionsReducer(state = initialState, action: QuestionActionsDto): PendingQuestionsState {
	switch (action.type) {
		case SendQuestionAction:
			return [action.payload.newQuestion, ...state];
		case SentQuestionAction:
		case FailedSentQuestionAction:
			return [...state.filter((pQuestion) => pQuestion.tmpId !== action.payload.tmpId)];
		default:
			return state;
	}
}
