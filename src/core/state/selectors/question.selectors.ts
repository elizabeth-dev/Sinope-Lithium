import { AppState } from '@core/state/app.store';
import { createSelector } from '@reduxjs/toolkit';
import { populateQuestionEntity } from '@shared/helper/question.helper';
import { FullQuestionEntity } from '@shared/types/entities/question.interface';
import { FetchEntity } from '@shared/types/fetchFields.interface';
import { fromProfile } from './profile.selectors';

const selectReceivedQuestionsState = (state: AppState) =>
	state.currentData.question.receivedQuestions[state.self.currentProfile];
const selectQuestionsByIdState = (state: AppState) => state.currentData.question.questionsById;

const selectQuestionById = () =>
	createSelector(
		(state: AppState, id: string) => state.currentData.question.questionsById[id],
		fromProfile.state.byId,
		populateQuestionEntity,
	);

const selectReceivedQuestions = createSelector(
	selectReceivedQuestionsState,
	selectQuestionsByIdState,
	fromProfile.state.byId,
	(received, questionsById, profilesById): FetchEntity<'questions', FullQuestionEntity[]> | undefined =>
		received && {
			...received,
			questions: (received?.questions ?? []).map((id) => populateQuestionEntity(questionsById[id], profilesById)),
		},
);

export const fromQuestion = {
	received: selectReceivedQuestions,
	make: {
		byId: selectQuestionById,
	},
	state: {
		received: selectReceivedQuestionsState,
		byId: selectQuestionsByIdState,
	},
};
