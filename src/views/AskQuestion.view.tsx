import { QuestionActions } from '@actions/question.actions';
import { AppState } from '@core/state/app.store';
import { fromProfile } from '@core/state/selectors/profile.selectors';
import { AskQuestionScreen } from '@screens/ask-question/AskQuestionScreen.component';
import { useAppDispatch } from '@shared/hooks/useAppDispatch.hook';
import { Navigation, NavigationFunctionComponent } from 'react-native-navigation';
import { useSelector } from 'react-redux';

export interface AskQuestionViewProps {
	recipient: string;
}

export const AskQuestionView: NavigationFunctionComponent<AskQuestionViewProps> = ({ recipient, componentId }) => {
	const dispatcher = useAppDispatch();

	const currentProfileId = useSelector(fromProfile.currentId);
	const profileEntity = useSelector((state: AppState) => fromProfile.byId(state, recipient));

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

	return <AskQuestionScreen placeholder={`New question for @${profileEntity.profile.tag}`} onSend={onSend} />;
};
