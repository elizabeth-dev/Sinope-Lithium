import { combineReducers } from 'redux';
import { questionsByIdReducer } from './question/questionsById.reducer';
import { receivedQuestionsReducer } from './question/receivedQuestions.reducer';
import { pendingQuestionsReducer } from './question/pendingQuestions.reducer';

export type QuestionState = ReturnType<typeof questionReducer>;

export const questionReducer = combineReducers({
	questionsById: questionsByIdReducer,
	receivedQuestions: receivedQuestionsReducer,
	pendingQuestions: pendingQuestionsReducer,
});
