import { AppViews } from '@core/app.views';
import { theme } from '@theme/main.theme';
import { Layout } from 'react-native-navigation';

export const profileScreenLayer = (profileId: string): Layout<{ profileId: string }> => ({
	component: {
		name: AppViews.ProfileView,
		passProps: {
			profileId,
		},
		options: {
			topBar: {
				backButton: {
					color: theme.colors.primaryForeground,
				},
			},
			sideMenu: {
				left: {
					enabled: false,
				},
			},
		},
	},
});
