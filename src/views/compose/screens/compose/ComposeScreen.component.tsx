import { PostActions } from '@actions/post.actions';
import { QuestionActions } from '@actions/question.actions';
import { fromProfile } from '@core/state/selectors/profile.selectors';
import { Divider } from '@shared/components/divider/Divider.component';
import { FlatButton } from '@shared/components/flat-button/FlatButton.component';
import { useAppDispatch } from '@shared/hooks/use-shallow-selector/useAppDispatch.hook';
import React from 'react';
import { KeyboardAvoidingView, TextInput, View } from 'react-native';
import { Navigation, NavigationFunctionComponent } from 'react-native-navigation';
import { useSelector } from 'react-redux';
import { ComposeScreenStyles as styles } from './ComposeScreen.styles';

export interface ComposeScreenProps {
	replyTo?: string;
	questionId?: string;
}

export const ComposeScreen: NavigationFunctionComponent<ComposeScreenProps> = ({
	componentId,
	replyTo,
	questionId,
}) => {
	const dispatcher = useAppDispatch();

	const [content, setContent] = React.useState('');
	const currentProfile = useSelector(fromProfile.currentId);

	const placeholder = replyTo
		? `Reply to ${replyTo}...`
		: questionId
		? `Answering ${questionId}...`
		: 'Write a new post...';

	return (
		<KeyboardAvoidingView style={styles.root}>
			<Divider />
			<TextInput
				style={styles.input}
				placeholder={placeholder}
				value={content}
				onChangeText={setContent}
				multiline
			/>
			<View style={styles.actionBar}>
				<FlatButton
					style={styles.sendButton}
					textStyle={styles.sendButtonText}
					onPress={() => {
						dispatcher(
							PostActions.send({
								newPost: {
									profile: currentProfile,
									content,
									tmpId: Date.now().toString(),
									question: questionId,
								},
							}),
						);
						if (questionId) {
							dispatcher(QuestionActions.getByProfile({ profile: currentProfile }));
						}

						Navigation.pop(componentId);
					}}>
					Send
				</FlatButton>
			</View>
		</KeyboardAvoidingView>
	);
};
