import { AuthActions } from '@core/actions/auth.actions';
import { AppState } from '@core/app.store';
import { useAppDispatch } from '@shared/hooks/use-shallow-selector/useAppDispatch.hook';
import { registerRoot } from '@shared/navigation/roots/register.root';
import React from 'react';
import { Keyboard, View } from 'react-native';
import {
	Navigation,
	NavigationFunctionComponent,
} from 'react-native-navigation';
import { Button, TextInput } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { LoginScreenStyles as styles } from './LoginScreen.styles';

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
				style={styles.loginButton}
				contentStyle={styles.loginButtonContent}
				mode="contained"
				onPress={onLogin}>
				Log In
			</Button>
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

LoginScreen.options = {
	blurOnUnmount: true,
};
