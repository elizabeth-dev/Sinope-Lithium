import React from 'react';
import { FirstProfileScreenStyles as styles } from './FirstProfileScreen.styles';
import { Keyboard, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useAppDispatch } from '@shared/hooks/use-shallow-selector/useAppDispatch.hook';
import { ProfileActions } from '@core/state/actions/profile.actions';
import { useSelector } from 'react-redux';
import { AppState } from '@core/state/app.store';

export const FirstProfileScreen: React.FC = () => {
	const dispatcher = useAppDispatch();

	const [name, setName] = React.useState('');
	const [tag, setTag] = React.useState('');

	const error = useSelector(
		(state: AppState) => state.reception.firstProfile.error,
	);

	const onCreate = () => {
		Keyboard.dismiss();
		dispatcher(ProfileActions.createFirst({ name, tag }));
	};

	return (
		<View style={styles.root}>
			<TextInput
				style={styles.input}
				label="Profile name"
				autoCompleteType="name"
				autoCapitalize="sentences"
				keyboardType="default"
				mode="outlined"
				error={error}
				value={name}
				onChangeText={setName}
			/>
			<TextInput
				style={styles.input}
				label="Profile tag"
				autoCompleteType="username"
				autoCapitalize="none"
				keyboardType="default"
				mode="outlined"
				error={error}
				value={tag}
				onChangeText={setTag}
			/>
			<Button
				style={styles.createButton}
				contentStyle={styles.createButtonContent}
				mode="contained"
				onPress={onCreate}>
				Create
			</Button>
		</View>
	);
};
