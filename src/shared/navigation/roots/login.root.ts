import { AppViews } from '@core/app.views';
import { LayoutRoot } from 'react-native-navigation';

export const loginRoot = (): LayoutRoot => ({
	root: {
		component: {
			name: AppViews.LoginView,
		},
	},
});
