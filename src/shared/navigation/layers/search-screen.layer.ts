import { AppViews } from '@core/app.views';
import { Layout } from 'react-native-navigation';

export const searchScreenLayer = (searchTerm: string): Layout<{ searchTerm: string }> => ({
	component: {
		name: AppViews.SearchView,
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
