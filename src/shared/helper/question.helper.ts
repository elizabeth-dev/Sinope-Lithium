import { ProfilesByIdState } from '@core/state/reducers/currentData/profile/profilesById.reducer';
import { FullQuestion, FullQuestionEntity, IQuestion, QuestionEntity } from '../types/entities/question.interface';

export const populateQuestionEntity = (question: QuestionEntity,
	profilesById: ProfilesByIdState): FullQuestionEntity => question && {
	...question,
	question: populateQuestion(question.question, profilesById),
};

export const populateQuestion = (question: IQuestion, profilesById: ProfilesByIdState): FullQuestion => question && ({
	...question,
	from: question.from ? profilesById[question.from]?.profile : undefined,
});
