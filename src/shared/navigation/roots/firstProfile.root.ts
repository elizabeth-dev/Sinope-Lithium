import { AppViews } from '@core/app.views';
import { LayoutRoot } from 'react-native-navigation';

export const firstProfileRoot = (): LayoutRoot => ({
	root: {
		component: {
			name: AppViews.FirstProfileView,
		},
	},
});
