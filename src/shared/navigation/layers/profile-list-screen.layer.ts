import { AppViews } from '@core/app.views';
import { Layout } from 'react-native-navigation';

export const profileListScreenLayer = (profileIds: string[], title: string): Layout<{ profileIds: string[] }> => ({
	component: {
		name: AppViews.ProfileListView,
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
