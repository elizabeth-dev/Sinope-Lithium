import { QuestionList } from '@molecules/question-list/QuestionList.component';
import { FullQuestion } from '@shared/types/entities/question.interface';
import React from 'react';

export interface QuestionsProps {
	questions: FullQuestion[];
	fetchingQuestions: boolean;
	onQuestionsRefresh: () => void;
	onQuestionAnswer: (questionId: string) => void;
	onProfileNav: (profileId: string) => void;
}

export const Questions: React.FC<QuestionsProps> = ({
	questions,
	fetchingQuestions,
	onQuestionsRefresh,
	onQuestionAnswer,
	onProfileNav,
}) => (
	<QuestionList
		questions={questions}
		refreshing={fetchingQuestions}
		onRefresh={() => onQuestionsRefresh()}
		onProfileNav={onProfileNav}
		onQuestionAnswer={onQuestionAnswer}
	/>
);
