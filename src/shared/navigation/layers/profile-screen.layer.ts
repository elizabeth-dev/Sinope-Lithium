import { Layout } from 'react-native-navigation';
import { AppScreens } from '@core/app.screens';

export const profileScreenLayer = (
	profileId: string,
): Layout<{ profileId: string }> => ({
	component: {
		name: AppScreens.ProfileScreen,
		passProps: {
			profileId,
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
