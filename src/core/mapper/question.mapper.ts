import { PostRes, QuestionRes } from '@core/api/model/api';
import { IQuestion } from '@shared/types/entities/question.interface';
import { Require } from '@shared/types/require.type';

export const questionResToIQuestion = (question: QuestionRes): IQuestion => ({
	id: question.id,
	anonymous: question.anonymous,
	content: question.content,
	date: question.date,
	recipient: question.recipientId,
	answer: question.answerId,
	from: question.fromId,
});

export const postResToIQuestion = (postRes: Require<PostRes, 'question'>): IQuestion =>
	questionResToIQuestion(postRes.question);
