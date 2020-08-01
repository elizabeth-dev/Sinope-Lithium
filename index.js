import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { Navigation } from 'react-native-navigation';
import { AppScreens } from './src/core/app.screens';
import { appStore } from './src/core/app.store';
import { reduxProviderHOC } from './src/shared/hoc/redux-provider/reduxProviderHOC';
import { ComposeScreen } from './src/views/compose/screens/compose/ComposeScreen.component';
import { DashboardScreen } from './src/views/dashboard/screens/dashboard/DashboardScreen.component';
import { DrawerScreen } from './src/views/dashboard/screens/drawer/DrawerScreen.component';
import { LoginScreen } from './src/views/login/screens/login/LoginScreen.component';
import { PostScreen } from './src/views/post/screens/post/PostScreen.component';
import { ProfileScreen } from './src/views/profile/screens/profile/ProfileScreen.component';
import { SplashScreen } from './src/views/splash/screens/splash/SplashScreen.component';

Navigation.registerComponent(AppScreens.SplashScreen, () =>
	gestureHandlerRootHOC(reduxProviderHOC(SplashScreen, appStore)),
);
Navigation.registerComponent(AppScreens.DashboardScreen, () =>
	gestureHandlerRootHOC(reduxProviderHOC(DashboardScreen, appStore)),
);
Navigation.registerComponent(AppScreens.DrawerScreen, () =>
	gestureHandlerRootHOC(reduxProviderHOC(DrawerScreen, appStore)),
);
Navigation.registerComponent(AppScreens.ProfileScreen, () =>
	gestureHandlerRootHOC(reduxProviderHOC(ProfileScreen, appStore)),
);
Navigation.registerComponent(AppScreens.PostScreen, () =>
	gestureHandlerRootHOC(reduxProviderHOC(PostScreen, appStore)),
);
Navigation.registerComponent(AppScreens.LoginScreen, () =>
	gestureHandlerRootHOC(reduxProviderHOC(LoginScreen, appStore)),
);
Navigation.registerComponent(AppScreens.ComposeScreen, () =>
	gestureHandlerRootHOC(reduxProviderHOC(ComposeScreen, appStore)),
);

Navigation.events().registerAppLaunchedListener(() => {
	Navigation.setRoot({
		root: {
			component: {
				name: AppScreens.SplashScreen,
			},
		},
	});
});
