import { AppScreens } from '@core/app.screens';
import { LayoutRoot } from 'react-native-navigation';
import { ImageSource } from 'react-native-vector-icons/Icon';

export const dashboardRoot = (menuIcon: ImageSource): LayoutRoot => ({
	root: {
		sideMenu: {
			left: {
				component: {
					name: AppScreens.DrawerScreen,
				},
			},
			center: {
				stack: {
					id: 'testComponentId',
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
												text: 'Menú',
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
							title: { text: 'Elizabeth' },
							subtitle: { text: '@Elizabeth' },
						},
					},
				},
			},
		},
	},
});
