/**
 * @format
 */

import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { Navigation } from 'react-native-navigation';
import { AppScreens } from './src/core/app.screens';
import { DashboardScreen } from './src/views/dashboard/screens/dashboard/DashboardScreen.component';
import { DrawerScreen } from './src/views/dashboard/screens/drawer/DrawerScreen.component';
import { LoginScreen } from './src/views/login/screens/login/LoginScreen.component';
import { PostScreen } from './src/views/post/screens/post/PostScreen.component';
import { ProfileScreen } from './src/views/profile/screens/profile/ProfileScreen.component';
import { SplashScreen } from './src/views/splash/screens/splash/SplashScreen.component';
import { ComposeScreen } from './src/views/compose/screens/compose/ComposeScreen.component';

Navigation.registerComponent(AppScreens.SplashScreen, () => gestureHandlerRootHOC(SplashScreen));
Navigation.registerComponent(AppScreens.DashboardScreen, () => gestureHandlerRootHOC(DashboardScreen));
Navigation.registerComponent(AppScreens.DrawerScreen, () => gestureHandlerRootHOC(DrawerScreen));
Navigation.registerComponent(AppScreens.ProfileScreen, () => gestureHandlerRootHOC(ProfileScreen));
Navigation.registerComponent(AppScreens.PostScreen, () => gestureHandlerRootHOC(PostScreen));
Navigation.registerComponent(AppScreens.LoginScreen, () => gestureHandlerRootHOC(LoginScreen));
Navigation.registerComponent(AppScreens.ComposeScreen, () => gestureHandlerRootHOC(ComposeScreen));

Navigation.events().registerAppLaunchedListener(() => {
	Navigation.setRoot({
		root: {
			component: {
				name: AppScreens.SplashScreen,
			},
		},
	});
});
