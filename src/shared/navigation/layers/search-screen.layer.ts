import { Layout } from 'react-native-navigation';
import { AppScreens } from '@core/app.screens';

export const searchScreenLayer = (searchTerm: string): Layout<{ searchTerm: string }> => ({
	component: {
		name: AppScreens.SearchScreen,
		passProps: {
			searchTerm,
		},
		options: {
			sideMenu: {
				left: {
					enabled: false,
				},
			},
		},
	},
});
