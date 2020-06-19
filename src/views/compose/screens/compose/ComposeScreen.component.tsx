import { PostActions } from '@core/actions/post.actions';
import { AppState } from '@core/app.store';
import React from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import { Navigation, NavigationComponentProps } from 'react-native-navigation';
import { Button, Divider, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { ComposeScreenStyles as styles } from './ComposeScreen.styles';

export interface ComposeScreenProps {
	replyTo?: string;
}

export const ComposeScreen: React.FC<NavigationComponentProps & ComposeScreenProps> = ({ componentId, replyTo }) => {
	const [content, setContent] = React.useState('');
	const profile = useSelector((state: AppState) => state.profile.self.current);
	const dispatcher = useDispatch();

	// TODO: Remove input underline on selection
	return (
		<KeyboardAvoidingView style={styles.root}>
			<Divider />
			<TextInput
				style={styles.input}
				placeholder={replyTo ? `Reply to ${replyTo}...` : 'Write a new post...'}
				value={content}
				onChangeText={setContent}
				underlineColor="#ffffff00"
				multiline
			/>
			<View style={styles.actionBar}>
				<Button
					style={styles.sendButton}
					contentStyle={styles.sendButtonContent}
					mode="contained"
					onPress={() => {
						dispatcher(PostActions.send({ profile, content, tmpId: Date.now().toString() }));
						Navigation.pop(componentId);
					}}>
					Send
				</Button>
			</View>
		</KeyboardAvoidingView>
	);
};