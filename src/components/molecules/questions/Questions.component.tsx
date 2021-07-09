import { QuestionActions } from '@actions/question.actions';
import { fromProfile } from '@core/state/selectors/profile.selectors';
import { fromQuestion } from '@core/state/selectors/question.selectors';
import { QuestionList } from '@molecules/question-list/QuestionList.component';
import { useAppDispatch } from '@shared/hooks/use-shallow-selector/useAppDispatch.hook';
import React from 'react';
import { useSelector } from 'react-redux';

export interface QuestionsProps {
	stackId: string;
}

export const Questions: React.FC<QuestionsProps> = ({ stackId }) => {
	const dispatcher = useAppDispatch();

	const currentProfile = useSelector(fromProfile.currentId);
	const receivedQuestions = useSelector(fromQuestion.received);

	const onRefresh = React.useCallback(() => {
		dispatcher(QuestionActions.getByProfile({ profile: currentProfile }));
	}, [currentProfile, dispatcher]);

	return (
		<QuestionList
			questions={receivedQuestions.questions.map((el) => el.question)}
			stackId={stackId}
			refreshing={receivedQuestions.isFetching}
			onRefresh={onRefresh}
		/>
	);
};
