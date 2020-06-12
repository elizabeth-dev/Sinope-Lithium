import React from 'react';
import { KeyboardAvoidingView, ToastAndroid, View } from 'react-native';
import { Navigation, NavigationComponentProps } from 'react-native-navigation';
import { Button, Divider, TextInput } from 'react-native-paper';
import { ComposeScreenStyles as styles } from './ComposeScreen.styles';

export const ComposeScreen: React.FC<NavigationComponentProps> = ({ componentId }) => {
	const [content, setContent] = React.useState('');

	// TODO: Remove input underline on selection
	return (
		<KeyboardAvoidingView style={styles.root}>
			<Divider />
			<TextInput
				style={styles.input}
				placeholder="Write a new post..."
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
						ToastAndroid.show('Sending post...', ToastAndroid.SHORT);
						Navigation.pop(componentId);
					}}>
					Send
				</Button>
			</View>
		</KeyboardAvoidingView>
	);
};
