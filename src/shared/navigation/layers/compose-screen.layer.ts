import { Layout } from 'react-native-navigation';
import { AppScreens } from '@core/app.screens';

export const composeScreenLayer = (replyTo?: string): Layout => ({
	component: {
		name: AppScreens.ComposeScreen,
		options: {
			topBar: {
				title: { text: '' },
				subtitle: { text: '' },
			},
			sideMenu: {
				left: {
					enabled: false,
				},
			},
			blurOnUnmount: true,
		},
		passProps: {
			replyTo,
		},
	},
});
