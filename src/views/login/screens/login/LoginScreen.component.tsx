import { AppScreens } from '@core/app.screens';
import React from 'react';
import { View } from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { Navigation } from 'react-native-navigation';
import { LoginScreenStyles as styles } from './LoginScreen.styles';

export const LoginScreen: React.FC = () => {
	const [ email, setEmail ] = React.useState('');
	const [ password, setPassword ] = React.useState('');

	return <View style={ styles.root } />;
};

Navigation.registerComponent(AppScreens.LoginScreen, () => gestureHandlerRootHOC(LoginScreen));
