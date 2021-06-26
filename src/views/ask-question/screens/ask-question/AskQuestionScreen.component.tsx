import React from 'react';
import { AskQuestionScreenStyles as styles } from './AskQuestionScreen.styles';
import { KeyboardAvoidingView, Switch, TextInput, View } from 'react-native';
import { FlatButton } from '@shared/components/flat-button/FlatButton.component';
import { Navigation, NavigationFunctionComponent } from 'react-native-navigation';
import { useAppDispatch } from '@shared/hooks/use-shallow-selector/useAppDispatch.hook';
import { QuestionActions } from '@actions/question.actions';
import { useSelector } from 'react-redux';
import { fromProfile } from '@core/state/selectors/profile.selectors';
import { Divider } from '@shared/components/divider/Divider.component';

export interface AskQuestionScreenProps {
	recipient: string;
}

export const AskQuestionScreen: NavigationFunctionComponent<AskQuestionScreenProps> = ({ componentId, recipient }) => {
	const dispatcher = useAppDispatch();

	const currentProfile = useSelector(fromProfile.currentId);

	const [content, setContent] = React.useState('');
	const [anonymous, setAnonymous] = React.useState(true);

	return (
		<KeyboardAvoidingView style={styles.root}>
			<Divider />
			<TextInput
				style={styles.input}
				placeholder={`New question for ${recipient}`}
				value={content}
				onChangeText={setContent}
				multiline
			/>
			<View style={styles.actionBar}>
				<Switch onValueChange={setAnonymous} value={anonymous} />
				<FlatButton
					style={styles.sendButton}
					onPress={() => {
						dispatcher(
							QuestionActions.send({
								newQuestion: {
									tmpId: Date.now().toString(),
									content,
									from: currentProfile,
									recipient,
									anonymous,
								},
							}),
						);
						Navigation.pop(componentId);
					}}>
					Send
				</FlatButton>
			</View>
		</KeyboardAvoidingView>
	);
};
