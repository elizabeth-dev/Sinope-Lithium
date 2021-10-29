import { PostActions } from '@actions/post.actions';
import { QuestionActions } from '@actions/question.actions';
import { AppState } from '@core/state/app.store';
import { fromPost } from '@core/state/selectors/post.selectors';
import { fromProfile } from '@core/state/selectors/profile.selectors';
import { fromQuestion } from '@core/state/selectors/question.selectors';
import { ComposeScreen } from '@screens/compose/ComposeScreen.component';
import { useAppDispatch } from '@shared/hooks/useAppDispatch.hook';
import { useMemo } from 'react';
import { Navigation, NavigationFunctionComponent } from 'react-native-navigation';
import { useSelector } from 'react-redux';

export interface ComposeViewProps {
	replyTo?: string;
	questionId?: string;
}
export const ComposeView: NavigationFunctionComponent<ComposeViewProps> = ({ replyTo, questionId, componentId }) => {
	const dispatcher = useAppDispatch();
	const selectPostById = useMemo(() => fromPost.make.byId(), []);
	const selectQuestionById = useMemo(() => fromQuestion.make.byId(), []);

	const currentProfileId = useSelector(fromProfile.currentId);
	const postEntity = useSelector((state: AppState) => (replyTo ? selectPostById(state, replyTo) : undefined));
	const questionEntity = useSelector((state: AppState) =>
		questionId ? selectQuestionById(state, questionId) : undefined,
	);

	const placeholder = postEntity
		? `Reply to @${postEntity.post.profile.tag}...`
		: questionId
		? `Answering "${questionEntity?.question.content}"...`
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
