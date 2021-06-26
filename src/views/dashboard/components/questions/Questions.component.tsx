import React from 'react';
import { QuestionList } from '@shared/components/question-list/QuestionList.component';
import { useAppDispatch } from '@shared/hooks/use-shallow-selector/useAppDispatch.hook';
import { useSelector } from 'react-redux';
import { fromQuestion } from '@core/state/selectors/question.selectors';
import { QuestionActions } from '@actions/question.actions';
import { fromProfile } from '@core/state/selectors/profile.selectors';

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
