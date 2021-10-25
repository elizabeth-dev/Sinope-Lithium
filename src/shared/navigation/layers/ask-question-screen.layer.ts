import { AppViews } from '@core/app.views';
import { theme } from '@theme/main.theme';
import { Layout } from 'react-native-navigation';

export const askQuestionScreenLayer = (recipient: string): Layout => ({
	component: {
		name: AppViews.AskQuestionView,
		options: {
			topBar: {
				title: {
					text: 'Ask a question',
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
			recipient,
		},
	},
});
