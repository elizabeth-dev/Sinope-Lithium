import { INewQuestion, IQuestion } from '@shared/types/entities/question.interface';

export const GetQuestionsByProfileAction = 'question/GetQuestionsByProfileAction';

export interface IGetQuestionsByProfileAction {
	type: typeof GetQuestionsByProfileAction;
	payload: {
		profile: string;
	};
}

const getQuestionsByProfileFn = (profile: string): IGetQuestionsByProfileAction => ({
	type: GetQuestionsByProfileAction,
	payload: { profile },
});

export const ReceiveQuestionsAction = 'question/ReceiveQuestionsAction';

export interface IReceiveQuestionsAction {
	type: typeof ReceiveQuestionsAction;
	payload: {
		questions: IQuestion[];
		receivedAt: number;
	};
}

const receiveQuestionsFn = (questions: IQuestion[], receivedAt: number): IReceiveQuestionsAction => ({
	type: ReceiveQuestionsAction,
	payload: { questions, receivedAt },
});

export const SendQuestionAction = 'question/SendQuestionAction';

export interface ISendQuestionAction {
	type: typeof SendQuestionAction;
	payload: {
		newQuestion: INewQuestion;
	};
}

const sendQuestionFn = (newQuestion: INewQuestion): ISendQuestionAction => ({
	type: SendQuestionAction,
	payload: { newQuestion },
});

export const SentQuestionAction = 'question/SentQuestionAction';

export interface ISentQuestionAction {
	type: typeof SentQuestionAction;
	payload: {
		question: IQuestion;
		receivedAt: number;
		tmpId: string;
	};
}

const sentQuestionFn = (question: IQuestion, receivedAt: number, tmpId: string): ISentQuestionAction => ({
	type: SentQuestionAction,
	payload: { question, receivedAt, tmpId },
});

export const FailedSentQuestionAction = 'question/FailedSentQuestionAction';

export interface IFailedSentQuestionAction {
	type: typeof FailedSentQuestionAction;
	payload: {
		tmpId: string;
	};
}

const failedSentQuestionFn = (tmpId: string): IFailedSentQuestionAction => ({
	type: FailedSentQuestionAction,
	payload: { tmpId },
});

export const RemoveQuestionAction = 'question/RemoveQuestionAction';

export interface IRemoveQuestionAction {
	type: typeof RemoveQuestionAction;
	payload: {
		question: string;
	};
}

const removeQuestionFn = (question: string): IRemoveQuestionAction => ({
	type: RemoveQuestionAction,
	payload: { question },
});

export const RemovedQuestionAction = 'question/RemovedQuestionAction';

export interface IRemovedQuestionAction {
	type: typeof RemovedQuestionAction;
	payload: {
		question: string;
	};
}

const removedQuestionFn = (question: string): IRemovedQuestionAction => ({
	type: RemovedQuestionAction,
	payload: { question },
});

export type QuestionActionsDto =
	| ISendQuestionAction
	| ISentQuestionAction
	| IGetQuestionsByProfileAction
	| IReceiveQuestionsAction
	| IRemoveQuestionAction
	| IRemovedQuestionAction
	| IFailedSentQuestionAction;

export const QuestionActions = {
	send: sendQuestionFn,
	sent: sentQuestionFn,
	failedSent: failedSentQuestionFn,
	getByProfile: getQuestionsByProfileFn,
	receive: receiveQuestionsFn,
	remove: removeQuestionFn,
	removed: removedQuestionFn,
};
