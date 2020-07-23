import { AuthActions } from '@core/actions/auth.actions';
import { Disclaimer } from '@shared/components/disclaimer/Disclaimer.component';
import React from 'react';
import { Keyboard, View } from 'react-native';
import { NavigationFunctionComponent } from 'react-native-navigation';
import { Button, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { LoginScreenStyles as styles } from './LoginScreen.styles';
import { AppState } from '@core/app.store';

export const LoginScreen: NavigationFunctionComponent = () => {
	const dispatch = useDispatch();
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const error = useSelector((state: AppState) => state.auth.error);

	const onLogin = () => {
		Keyboard.dismiss();
		dispatch(AuthActions.login(email, password));
	};

	return (
		<View style={styles.root}>
			<Disclaimer style={[styles.disclaimer, styles.disclaimerTop]}>
				UNSTABLE - INSECURE
			</Disclaimer>
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
			<Disclaimer style={[styles.disclaimer, styles.disclaimerBottom]}>
				UNSTABLE - INSECURE
			</Disclaimer>
		</View>
	);
};

LoginScreen.options = {
	blurOnUnmount: true,
};
