import { AppScreens } from '@core/app.screens';
import { theme } from '@theme/main.theme';
import { Layout } from 'react-native-navigation';

export const profileScreenLayer = (profileId: string): Layout<{ profileId: string }> => ({
	component: {
		name: AppScreens.ProfileScreen,
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
