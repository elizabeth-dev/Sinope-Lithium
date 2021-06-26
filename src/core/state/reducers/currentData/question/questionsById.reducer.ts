import { QuestionEntity } from '@shared/types/entities/question.interface';
import { QuestionActionsDto, ReceiveQuestionsAction } from '@actions/question.actions';
import {
	IReceivePostsAction,
	IReceiveProfilePostsAction,
	ReceivePostsAction,
	ReceiveProfilePostsAction,
} from '@actions/post.actions';
import { IReceiveTimelineAction, ReceiveTimelineAction } from '@actions/timeline.actions';
import { IReceiveSearchAction, ReceiveSearchAction } from '@actions/search.actions';

export type QuestionsByIdState = {
	[id: string]: QuestionEntity;
};

const initialState: QuestionsByIdState = {};

export function questionsByIdReducer(
	state = initialState,
	action:
		| QuestionActionsDto
		| IReceivePostsAction
		| IReceiveProfilePostsAction
		| IReceiveTimelineAction
		| IReceiveSearchAction,
): QuestionsByIdState {
	switch (action.type) {
		case ReceiveQuestionsAction:
		case ReceivePostsAction:
		case ReceiveProfilePostsAction:
		case ReceiveTimelineAction:
		case ReceiveSearchAction:
			return {
				...state,
				...action.payload.questions.reduce(
					(acc, question) => ({
						...acc,
						[question.id]: {
							question: {
								...question,
								from: question.from,
							},
							isFetching: false,
							receivedAt: action.payload.receivedAt,
						},
					}),
					{} as QuestionsByIdState,
				),
			};
		default:
			return state;
	}
}
