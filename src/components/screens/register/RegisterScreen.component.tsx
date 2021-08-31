import { Button } from '@atoms/button/Button.component';
import { TextInput } from '@atoms/text-input/TextInput.component';
import React from 'react';
import { View } from 'react-native';
import { RegisterScreenStyles as styles } from './RegisterScreen.styles';

export interface RegisterScreenProps {
	passEmail?: string;
	error: boolean;
	onRegister: (email: string, password: string) => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ passEmail, error, onRegister }) => {
	const [email, setEmail] = React.useState(passEmail ?? '');
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
			<Button style={styles.registerButton} onPress={() => onRegister(email, password)}>
				Register
			</Button>
		</View>
	);
};
