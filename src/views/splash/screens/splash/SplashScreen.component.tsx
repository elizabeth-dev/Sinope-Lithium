import { AppScreens } from '@core/app.screens';
import React from 'react';
import { Text, View } from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { Navigation } from 'react-native-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SplashScreenStyles as styles } from './SplashScreen.styles';

export const SplashScreen: React.FC = () => {
	Promise.all([
		MaterialCommunityIcons.getImageSource('menu', 25),
	])
		.then(([ menuIcon ]) => {
			Navigation.setRoot({
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
		});

	return (
		<View style={ styles.root }>
			<Text>Splash</Text>
		</View>
	);
};

Navigation.registerComponent(AppScreens.SplashScreen, () => gestureHandlerRootHOC(SplashScreen));
