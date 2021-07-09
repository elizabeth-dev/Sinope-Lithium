import { AuthActions } from '@actions/auth.actions';
import { Button } from '@atoms/button/Button.component';
import { TextInput } from '@atoms/text-input/TextInput.component';
import { AppState } from '@core/state/app.store';
import { useAppDispatch } from '@shared/hooks/use-shallow-selector/useAppDispatch.hook';
import React from 'react';
import { Keyboard, View } from 'react-native';
import { NavigationFunctionComponent } from 'react-native-navigation';
import { useSelector } from 'react-redux';
import { RegisterScreenStyles as styles } from './RegisterScreen.styles';

export interface RegisterScreenProps {
	passEmail?: string;
}

export const RegisterScreen: NavigationFunctionComponent<RegisterScreenProps> = ({ passEmail }) => {
	const dispatch = useAppDispatch();

	const [email, setEmail] = React.useState(passEmail ?? '');
	const [password, setPassword] = React.useState('');

	const error = useSelector((state: AppState) => state.reception.register.error);

	const onRegister = () => {
		Keyboard.dismiss();
		dispatch(AuthActions.register({ email, password }));
	};

	return (
		<View style={styles.root}>
			<TextInput
				placeholder="Email"
				autoCompleteType="email"
				autoCapitalize="none"
				keyboardType="email-address"
				error={error}
				value={email}
				onChangeText={setEmail}
			/>
			<TextInput
				placeholder="Password"
				autoCompleteType="password"
				autoCapitalize="none"
				secureTextEntry={true}
				error={error}
				value={password}
				onChangeText={setPassword}
			/>
			<Button style={styles.registerButton} onPress={onRegister}>
				Register
			</Button>
		</View>
	);
};
