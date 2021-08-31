import { QuestionActions } from '@actions/question.actions';
import { fromProfile } from '@core/state/selectors/profile.selectors';
import { AskQuestionScreen } from '@screens/ask-question/AskQuestionScreen.component';
import { useAppDispatch } from '@shared/hooks/use-shallow-selector/useAppDispatch.hook';
import React from 'react';
import { Navigation, NavigationFunctionComponent } from 'react-native-navigation';
import { useSelector } from 'react-redux';

export interface AskQuestionViewProps {
	recipient: string;
}

export const AskQuestionView: NavigationFunctionComponent<AskQuestionViewProps> = ({ recipient, componentId }) => {
	const dispatcher = useAppDispatch();

	const currentProfileId = useSelector(fromProfile.currentId);

	const onSend = (content: string, anonymous: boolean) => {
		dispatcher(
			QuestionActions.send({
				newQuestion: {
					tmpId: Date.now().toString(),
					content,
					from: currentProfileId,
					recipient,
					anonymous,
				},
			}),
		);
		Navigation.pop(componentId);
	};

	return <AskQuestionScreen recipient={recipient} onSend={onSend} />;
};
