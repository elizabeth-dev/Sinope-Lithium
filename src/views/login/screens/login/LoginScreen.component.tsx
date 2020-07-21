import { AuthActions } from '@core/actions/auth.actions';
import React from 'react';
import { Keyboard, View } from 'react-native';
import { NavigationFunctionComponent } from 'react-native-navigation';
import { Button, TextInput } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { LoginScreenStyles as styles } from './LoginScreen.styles';

export const LoginScreen: NavigationFunctionComponent = () => {
	const dispatch = useDispatch();
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');

	const onLogin = () => {
		Keyboard.dismiss();
		dispatch(AuthActions.login(email, password));
	};

	return (
		<View style={styles.root}>
			<TextInput
				style={styles.input}
				label="Email"
				mode="outlined"
				value={email}
				onChangeText={setEmail}
			/>
			<TextInput
				style={styles.input}
				label="Password"
				mode="outlined"
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
		</View>
	);
};

LoginScreen.options = {
	blurOnUnmount: true,
};
