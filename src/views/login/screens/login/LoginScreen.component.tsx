import { AuthActions } from '@core/actions/auth.actions';
import React from 'react';
import { View, Linking, ToastAndroid } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { LoginScreenStyles as styles } from './LoginScreen.styles';

export const LoginScreen: React.FC = () => {
	const dispatch = useDispatch();
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');

	Linking.getInitialURL().then((aaa) => {
	console.log(aaa);
	ToastAndroid.show(aaa || '', ToastAndroid.LONG);})

	const onLogin = () => dispatch(AuthActions.login(email, password));
	return (
		<View style={styles.root}>
			<TextInput style={styles.input} label="Email" mode="outlined" value={email} onChangeText={setEmail} />
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
