import { AppViews } from '@core/app.views';
import { LayoutRoot } from 'react-native-navigation';

export const registerRoot = (email?: string): LayoutRoot => ({
	root: {
		component: {
			name: AppViews.RegisterView,
			passProps: {
				passEmail: email,
			},
		},
	},
});
