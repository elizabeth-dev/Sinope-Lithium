import { Button } from '@atoms/button/Button.component';
import { TextInput } from '@atoms/text-input/TextInput.component';
import React from 'react';
import { View } from 'react-native';
import { FirstProfileScreenStyles as styles } from './FirstProfileScreen.styles';

export interface FirstProfileScreenProps {
	error: boolean;
	onCreate: (name: string, tag: string) => void;
}

export const FirstProfileScreen: React.FC<FirstProfileScreenProps> = ({ error, onCreate }) => {
	const [name, setName] = React.useState('');
	const [tag, setTag] = React.useState('');

	return (
		<View style={styles.root}>
			<TextInput
				placeholder="Profile name"
				autoCompleteType="name"
				autoCapitalize="sentences"
				keyboardType="default"
				error={error}
				value={name}
				onChangeText={setName}
			/>
			<TextInput
				placeholder="Profile tag"
				autoCompleteType="username"
				autoCapitalize="none"
				keyboardType="default"
				error={error}
				value={tag}
				onChangeText={setTag}
			/>
			<Button style={styles.createButton} onPress={() => onCreate(name, tag)}>
				Create
			</Button>
		</View>
	);
};
