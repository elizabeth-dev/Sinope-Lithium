import { PostActions } from '@core/actions/post.actions';
import { AppState } from '@core/app.store';
import { useAppDispatch } from '@shared/hooks/use-shallow-selector/useAppDispatch.hook';
import React from 'react';
import { KeyboardAvoidingView, TextInput, View } from 'react-native';
import {
	Navigation,
	NavigationFunctionComponent,
} from 'react-native-navigation';
import { Button, Divider } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { ComposeScreenStyles as styles } from './ComposeScreen.styles';
import { fromProfile } from '@core/selectors/profile.selectors';

export interface ComposeScreenProps {
	replyTo?: string;
}

export const ComposeScreen: NavigationFunctionComponent<ComposeScreenProps> = ({
	componentId,
	replyTo,
}) => {
	const dispatcher = useAppDispatch();

	const [content, setContent] = React.useState('');
	const currentProfile = useSelector(fromProfile.currentId);

	// TODO: Remove input underline on selection
	return (
		<KeyboardAvoidingView style={styles.root}>
			<Divider />
			<TextInput
				style={styles.input}
				placeholder={
					replyTo ? `Reply to ${replyTo}...` : 'Write a new post...'
				}
				value={content}
				onChangeText={setContent}
				multiline
			/>
			<View style={styles.actionBar}>
				<Button
					style={styles.sendButton}
					contentStyle={styles.sendButtonContent}
					mode="contained"
					onPress={() => {
						dispatcher(
							PostActions.send({
								profile: currentProfile,
								content,
								tmpId: Date.now().toString(),
							}),
						);
						Navigation.pop(componentId);
					}}>
					Send
				</Button>
			</View>
		</KeyboardAvoidingView>
	);
};
