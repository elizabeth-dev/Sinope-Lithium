import { Divider } from '@atoms/divider/Divider.component';
import { FlatButton } from '@atoms/flat-button/FlatButton.component';
import React from 'react';
import { KeyboardAvoidingView, TextInput, View } from 'react-native';
import { ComposeScreenStyles as styles } from './ComposeScreen.styles';

export interface ComposeScreenProps {
	placeholder: string;
	onSend: (content: string) => void;
}

export const ComposeScreen: React.FC<ComposeScreenProps> = ({ onSend, placeholder }) => {
	const [content, setContent] = React.useState('');

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
				<FlatButton style={styles.sendButton} textStyle={styles.sendButtonText} onPress={() => onSend(content)}>
					Send
				</FlatButton>
			</View>
		</KeyboardAvoidingView>
	);
};
