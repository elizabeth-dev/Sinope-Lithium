import { AppViews } from '@core/app.views';
import { theme } from '@theme/main.theme';
import { LayoutRoot } from 'react-native-navigation';
import { ImageSource } from 'react-native-vector-icons/Icon';

export const dashboardRoot = (menuIcon: ImageSource, profileName: string, profileTag: string): LayoutRoot => ({
	root: {
		sideMenu: {
			left: {
				component: {
					name: AppViews.DrawerView,
				},
			},
			center: {
				stack: {
					id: 'centerStack',
					children: [
						{
							component: {
								name: AppViews.DashboardView,
								options: {
									topBar: {
										leftButtons: [
											{
												id: 'DASHBOARD_MENU',
												icon: menuIcon,
												text: 'Menu',
												color: theme.colors.primaryForeground, // TODO: not applying opacity
											},
										],
									},
								},
							},
						},
					],
					options: {
						topBar: {
							elevation: 0,
							title: {
								text: profileName,
								color: theme.colors.primaryForeground,
								fontSize: theme.font.headline.size,
								fontWeight: theme.font.headline.weight,
							},
							subtitle: {
								text: `@${profileTag}`,
								color: theme.colors.primaryForeground,
								fontSize: theme.font.subtitle.size,
								fontWeight: theme.font.subtitle.weight,
							},
							background: {
								color: theme.colors.primary,
							},
						},
					},
				},
			},
		},
	},
});
