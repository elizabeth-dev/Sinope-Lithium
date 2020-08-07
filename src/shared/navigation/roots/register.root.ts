import { AppScreens } from '@core/app.screens';
import { LayoutRoot } from 'react-native-navigation';

export const registerRoot = (email?: string): LayoutRoot => ({
	root: {
		component: {
			name: AppScreens.RegisterScreen,
			passProps: {
				passEmail: email,
			},
		},
	},
});
