import { Layout } from 'react-native-navigation';
import { AppScreens } from '@core/app.screens';

export const postScreenLayer = (postId: string): Layout<{ postId: string }> => ({
	component: {
		name: AppScreens.PostScreen,
		options: {
			topBar: {
				title: {
					text: 'Post',
				},
				subtitle: {
					text: '',
				},
				elevation: 2, // Default
			},
		},
		passProps: {
			postId,
		},
	},
});
