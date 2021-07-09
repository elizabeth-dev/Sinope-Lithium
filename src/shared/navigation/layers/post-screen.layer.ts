import { AppScreens } from '@core/app.screens';
import { theme } from '@theme/main.theme';
import { Layout } from 'react-native-navigation';

export const postScreenLayer = (postId: string): Layout<{ postId: string }> => ({
	component: {
		name: AppScreens.PostScreen,
		options: {
			topBar: {
				title: {
					text: 'Post',
					color: theme.colors.primaryForeground,
					fontSize: theme.font.headline.size,
					fontWeight: theme.font.headline.weight,
				},
				subtitle: {
					text: '',
				},
				backButton: {
					color: theme.colors.primaryForeground,
				},
				elevation: 2, // Default
			},
			sideMenu: {
				left: {
					enabled: false,
				},
			},
		},
		passProps: {
			postId,
		},
	},
});
