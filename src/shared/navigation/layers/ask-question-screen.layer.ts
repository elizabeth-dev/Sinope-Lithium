import { Layout } from 'react-native-navigation';
import { AppScreens } from '@core/app.screens';

export const askQuestionScreenLayer = (recipient: string): Layout => ({
	component: {
		name: AppScreens.AskQuestionScreen,
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
			recipient,
		},
	},
});
