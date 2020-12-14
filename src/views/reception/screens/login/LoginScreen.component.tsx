import { AuthActions } from '@core/state/actions/auth.actions';
import { AppState } from '@core/state/app.store';
import { useAppDispatch } from '@shared/hooks/use-shallow-selector/useAppDispatch.hook';
import { registerRoot } from '@shared/navigation/roots/register.root';
import React from 'react';
import { Keyboard, View } from 'react-native';
import { Navigation, NavigationFunctionComponent } from 'react-native-navigation';
import { useSelector } from 'react-redux';
import { LoginScreenStyles as styles } from './LoginScreen.styles';
import { Button } from '@shared/components/button/Button.component';
import { TextInput } from '@shared/components/text-input/TextInput.component';

export const LoginScreen: NavigationFunctionComponent = () => {
	const dispatch = useAppDispatch();

	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const error = useSelector((state: AppState) => state.reception.login.error);

	const onLogin = () => {
		Keyboard.dismiss();
		dispatch(AuthActions.login(email, password));
	};

	const onRegister = () => {
		Keyboard.dismiss();
		Navigation.setRoot(registerRoot(email));
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
			<Button
				style={styles.loginButton}
				onPress={onLogin}>
				Log In
			</Button>
			<Button
				style={styles.registerButton}
				onPress={onRegister}>
				Register
			</Button>
		</View>
	);
};

LoginScreen.options = {
	blurOnUnmount: true,
};
