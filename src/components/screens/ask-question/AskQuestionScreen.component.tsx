import { Divider } from '@atoms/divider/Divider.component';
import { FlatButton } from '@atoms/flat-button/FlatButton.component';
import React from 'react';
import { KeyboardAvoidingView, Switch, TextInput, View } from 'react-native';
import { AskQuestionScreenStyles as styles } from './AskQuestionScreen.styles';

export interface AskQuestionScreenProps {
	placeholder: string;
	onSend: (content: string, anonymous: boolean) => void;
}

export const AskQuestionScreen: React.FC<AskQuestionScreenProps> = ({ placeholder, onSend }) => {
	const [content, setContent] = React.useState('');
	const [anonymous, setAnonymous] = React.useState(true);

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
				<Switch onValueChange={setAnonymous} value={anonymous} />
				<FlatButton
					style={styles.sendButton}
					textStyle={styles.sendButtonText}
					onPress={() => onSend(content, anonymous)}>
					Send
				</FlatButton>
			</View>
		</KeyboardAvoidingView>
	);
};
