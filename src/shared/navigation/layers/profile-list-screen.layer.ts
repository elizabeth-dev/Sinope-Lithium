import { Layout } from 'react-native-navigation';
import { AppScreens } from '@core/app.screens';

export const profileListScreenLayer = (profileIds: string[], title: string): Layout<{ profileIds: string[] }> => ({
	component: {
		name: AppScreens.ProfileListScreen,
		passProps: {
			profileIds,
		},
		options: {
			sideMenu: {
				left: {
					enabled: false,
				},
			},
			topBar: {
				title: {
					text: title,
				},
			},
		},
	},
});
