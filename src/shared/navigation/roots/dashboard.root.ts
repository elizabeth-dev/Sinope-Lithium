import { AppScreens } from '@core/app.screens';
import { LayoutRoot } from 'react-native-navigation';
import { ImageSource } from 'react-native-vector-icons/Icon';

export const dashboardRoot = (
	menuIcon: ImageSource,
	profileName: string,
	profileTag: string,
): LayoutRoot => ({
	root: {
		sideMenu: {
			left: {
				component: {
					name: AppScreens.DrawerScreen,
				},
			},
			center: {
				stack: {
					id: 'centerStack',
					children: [
						{
							component: {
								name: AppScreens.DashboardScreen,
								options: {
									topBar: {
										leftButtons: [
											{
												id: 'DASHBOARD_MENU',
												icon: menuIcon,
												text: 'Menu',
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
							title: { text: profileName },
							subtitle: { text: `@${profileTag}` },
						},
					},
				},
			},
		},
	},
});
