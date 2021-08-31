import { QuestionList } from '@molecules/question-list/QuestionList.component';
import { FullQuestion } from '@shared/types/entities/question.interface';
import React from 'react';

export interface QuestionsProps {
	questions: FullQuestion[];
	fetchingQuestions: boolean;
	currentProfileId: string;
	componentId: string;
	onQuestionsRefresh: (profileId: string) => void;
	onQuestionAnswer: (questionId: string) => void;
	onProfileNav: (profileId: string, componentId: string) => void;
}

export const Questions: React.FC<QuestionsProps> = ({
	questions,
	fetchingQuestions,
	currentProfileId,
	componentId,
	onQuestionsRefresh,
	onQuestionAnswer,
	onProfileNav,
}) => (
	<QuestionList
		questions={questions}
		refreshing={fetchingQuestions}
		componentId={componentId}
		onRefresh={() => onQuestionsRefresh(currentProfileId)}
		onProfileNav={onProfileNav}
		onQuestionAnswer={onQuestionAnswer}
	/>
);
