import { AuthActions } from '@core/actions/auth.actions';
import { AppState } from '@core/app.store';
import { useAppDispatch } from '@shared/hooks/use-shallow-selector/useAppDispatch.hook';
import React from 'react';
import { Keyboard, View } from 'react-native';
import { NavigationFunctionComponent } from 'react-native-navigation';
import { Button, TextInput } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RegisterScreenStyles as styles } from './RegisterScreen.styles';

export interface RegisterScreenProps {
	passEmail?: string;
}

export const RegisterScreen: NavigationFunctionComponent<RegisterScreenProps> = ({
	passEmail,
}) => {
	const dispatch = useAppDispatch();

	const [name, setName] = React.useState('');
	const [email, setEmail] = React.useState(passEmail ?? '');
	const [password, setPassword] = React.useState('');

	const error = useSelector(
		(state: AppState) => state.reception.register.error,
	);

	const onRegister = () => {
		Keyboard.dismiss();
		dispatch(AuthActions.register(name, email, password));
	};

	return (
		<View style={styles.root}>
			<TextInput
				style={styles.input}
				label="Name"
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
				label="Email"
				autoCompleteType="email"
				autoCapitalize="none"
				keyboardType="email-address"
				mode="outlined"
				error={error}
				value={email}
				onChangeText={setEmail}
			/>
			<TextInput
				style={styles.input}
				label="Password"
				autoCompleteType="password"
				autoCapitalize="none"
				secureTextEntry={true}
				mode="outlined"
				error={error}
				value={password}
				onChangeText={setPassword}
			/>
			<Button
				style={styles.registerButton}
				contentStyle={styles.registerButtonContent}
				mode="contained"
				onPress={onRegister}>
				Register
			</Button>
		</View>
	);
};
