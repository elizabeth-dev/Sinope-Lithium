import { Button } from '@atoms/button/Button.component';
import { TextInput } from '@atoms/text-input/TextInput.component';
import React from 'react';
import { View } from 'react-native';
import { LoginScreenStyles as styles } from './LoginScreen.styles';

export interface LoginScreenProps {
	error: boolean;
	onLogin: (email: string, password: string) => void;
	onRegister: (email?: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ error, onLogin, onRegister }) => {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');

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
			<Button style={styles.loginButton} onPress={() => onLogin(email, password)}>
				Log In
			</Button>
			<Button style={styles.registerButton} onPress={() => onRegister(email)}>
				Register
			</Button>
		</View>
	);
};
