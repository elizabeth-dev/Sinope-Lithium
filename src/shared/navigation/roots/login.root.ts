import { AppScreens } from '@core/app.screens';
import { LayoutRoot } from 'react-native-navigation';

export const loginRoot = (): LayoutRoot => ({
	root: {
		component: {
			name: AppScreens.LoginScreen,
		},
	},
});
