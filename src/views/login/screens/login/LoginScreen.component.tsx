import React from 'react';
import { View } from 'react-native';
import { LoginScreenStyles as styles } from './LoginScreen.styles';

export const LoginScreen: React.FC = () => {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');

	return <View style={styles.root}></View>;
};
