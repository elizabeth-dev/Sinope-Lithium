/**
 * @format
 */

import { Navigation } from 'react-native-navigation';
import { SplashScreen } from './src/views/splash/screens/splash/SplashScreen.component';

Navigation.events().registerAppLaunchedListener(async () => {
	await Navigation.setRoot({
		root: {
			component: {
				name: SplashScreen.displayName,
			},
		},
	});
});
