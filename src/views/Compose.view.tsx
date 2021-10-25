import { PostActions } from '@actions/post.actions';
import { QuestionActions } from '@actions/question.actions';
import { fromProfile } from '@core/state/selectors/profile.selectors';
import { ComposeScreen } from '@screens/compose/ComposeScreen.component';
import { useAppDispatch } from '@shared/hooks/use-shallow-selector/useAppDispatch.hook';
import { Navigation, NavigationFunctionComponent } from 'react-native-navigation';
import { useSelector } from 'react-redux';

export interface ComposeViewProps {
	replyTo?: string;
	questionId?: string;
}
export const ComposeView: NavigationFunctionComponent<ComposeViewProps> = ({ replyTo, questionId, componentId }) => {
	const dispatcher = useAppDispatch();

	const currentProfileId = useSelector(fromProfile.currentId);

	const placeholder = replyTo
		? `Reply to ${replyTo}...`
		: questionId
		? `Answering ${questionId}...`
		: 'Write a new post...';

	const onSend = (content: string) => {
		dispatcher(
			PostActions.send({
				newPost: {
					profile: currentProfileId,
					content,
					tmpId: Date.now().toString(),
					question: questionId,
				},
			}),
		);

		if (questionId) dispatcher(QuestionActions.getByProfile({ profile: currentProfileId }));

		Navigation.pop(componentId);
	};

	return <ComposeScreen placeholder={placeholder} onSend={onSend} />;
};
