/**
 * @format
 */

import { AppScreens } from '@core/app.screens';
import { Navigation } from 'react-native-navigation';

Navigation.events().registerAppLaunchedListener(async () => {
	await Navigation.setRoot({
		root: {
			component: {
				name: AppScreens.SplashScreen,
			},
		},
	});
});
