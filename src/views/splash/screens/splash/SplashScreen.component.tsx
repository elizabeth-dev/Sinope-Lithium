import { AppScreens } from '@core/app.screens';
import React from 'react';
import { Text, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { SplashScreenStyles as styles } from './SplashScreen.styles';

export const SplashScreen: React.FC = () => {
	Navigation.setRoot({
		root: {
			component: {
				name: AppScreens.LoginScreen,
			},
		},
	});

	return (
		<View style={styles.root}>
			<Text>Splash</Text>
		</View>
	);
};
