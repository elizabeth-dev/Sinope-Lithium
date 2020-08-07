import { AppScreens } from '@core/app.screens';
import { LayoutRoot } from 'react-native-navigation';

export const firstProfileRoot = (): LayoutRoot => ({
	root: {
		component: {
			name: AppScreens.FirstProfileScreen,
		},
	},
});
