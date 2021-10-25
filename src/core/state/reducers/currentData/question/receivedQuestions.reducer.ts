import { GetQuestionsByProfileAction, QuestionActionsDto, ReceiveQuestionsAction } from '@actions/question.actions';
import { FetchEntity } from '@shared/types/fetchFields.interface';

export type ReceivedQuestionsState = { [profile: string]: FetchEntity<'questions', string[]> };

const initialState: ReceivedQuestionsState = {};

export function receivedQuestionsReducer(state = initialState, action: QuestionActionsDto): ReceivedQuestionsState {
	switch (action.type) {
		case GetQuestionsByProfileAction:
			return {
				...state,
				[action.payload.profile]: {
					...state[action.payload.profile],
					isFetching: true,
				},
			};
		case ReceiveQuestionsAction:
			return {
				...state,
				[action.payload.profile]: {
					...state[action.payload.profile],
					questions: action.payload.questions.map((el) => el.id),
					receivedAt: action.payload.receivedAt,
					isFetching: false,
				},
			};
		default:
			return state;
	}
}
