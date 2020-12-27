import { FetchEntity } from '@shared/types/fetchFields.interface';
import {
	GetQuestionsByProfileAction,
	QuestionActionsDto,
	ReceiveQuestionsAction,
} from '../../../actions/question.actions';

export type ReceivedQuestionsState = FetchEntity<'questions', string[]>;

const initialState: ReceivedQuestionsState = {
	isFetching: false,
	questions: [],
	receivedAt: Date.now(),
};

export function receivedQuestionsReducer(state = initialState, action: QuestionActionsDto): ReceivedQuestionsState {
	switch (action.type) {
		case GetQuestionsByProfileAction:
			return {
				...state,
				isFetching: true,
			};
		case ReceiveQuestionsAction:
			return {
				...state,
				questions: action.payload.questions.map((el) => el.id),
				receivedAt: action.payload.receivedAt,
				isFetching: false,
			};
		default:
			return state;
	}
}
