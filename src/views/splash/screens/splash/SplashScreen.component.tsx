import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { Navigation } from 'react-native-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { DrawerScreen } from '../../../dashboard/screens/drawer/DrawerScreen.component';
import { DashboardScreen } from '../../../dashboard/screens/dashboard/DashboardScreen.component';
import { SplashScreenStyles as styles } from './SplashScreen.styles';

export const SplashScreen: React.FC = () => {
	Promise.all([
			MaterialCommunityIcons.getImageSource('menu', 25), ,
		])
		.then(([ menuIcon ]) => {
			Navigation.setRoot({
				root: {
					sideMenu: {
						left: {
							component: {
								name: DrawerScreen.displayName as string,
							},
						},
						center: {
							stack: {
								children: [
									{
										component: {
											name: DashboardScreen.displayName as string,
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
		<SafeAreaView style={ styles.root }>
			<Text>Splash</Text>
		</SafeAreaView>
	);
};

SplashScreen.displayName = 'app.sinope.lithium.splash.SplashScreen';
Navigation.registerComponent(SplashScreen.displayName, () => gestureHandlerRootHOC(SplashScreen));
