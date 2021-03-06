import { AppScreens } from '@core/app.screens';
import { theme } from '@theme/main.theme';
import { Layout } from 'react-native-navigation';

export const composeScreenLayer = (replyTo?: string, questionId?: string): Layout => ({
	component: {
		name: AppScreens.ComposeScreen,
		options: {
			topBar: {
				title: {
					text: 'Compose',
					color: theme.colors.primaryForeground,
					fontSize: theme.font.headline.size,
					fontWeight: theme.font.headline.weight,
				},
				subtitle: { text: '' },
				backButton: {
					color: theme.colors.primaryForeground,
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
			replyTo,
			questionId,
		},
	},
});
