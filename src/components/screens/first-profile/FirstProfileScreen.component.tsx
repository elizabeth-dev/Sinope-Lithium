import { ProfileActions } from '@actions/profile.actions';
import { Button } from '@atoms/button/Button.component';
import { TextInput } from '@atoms/text-input/TextInput.component';
import { AppState } from '@core/state/app.store';
import { useAppDispatch } from '@shared/hooks/use-shallow-selector/useAppDispatch.hook';
import React from 'react';
import { Keyboard, View } from 'react-native';
import { useSelector } from 'react-redux';
import { FirstProfileScreenStyles as styles } from './FirstProfileScreen.styles';

export const FirstProfileScreen: React.FC = () => {
	const dispatcher = useAppDispatch();

	const [name, setName] = React.useState('');
	const [tag, setTag] = React.useState('');

	const error = useSelector((state: AppState) => state.reception.firstProfile.error);

	const onCreate = () => {
		Keyboard.dismiss();
		dispatcher(ProfileActions.createFirst({ newProfile: { name, tag } }));
	};

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
			<Button style={styles.createButton} onPress={onCreate}>
				Create
			</Button>
		</View>
	);
};
