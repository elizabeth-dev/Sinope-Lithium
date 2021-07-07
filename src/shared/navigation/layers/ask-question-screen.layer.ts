import { AppScreens } from '@core/app.screens';
import { theme } from '@theme/main.theme';
import { Layout } from 'react-native-navigation';

export const askQuestionScreenLayer = (recipient: string): Layout => ({
	component: {
		name: AppScreens.AskQuestionScreen,
		options: {
			topBar: {
				title: {
					text: 'Ask a question',
					color: theme.font.headline.color,
					fontSize: theme.font.headline.size,
					fontWeight: theme.font.headline.weight,
				},
				subtitle: { text: '' },
				backButton: {
					color: theme.colors.foreground,
				},
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
