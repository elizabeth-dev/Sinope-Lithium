import { screenHOC } from '@shared/hoc/screenHOC/screenHOC';
import { Navigation } from 'react-native-navigation';
import { AppScreens } from '@core/app.screens';
import { appStore } from '@core/state/app.store';
import { ComposeScreen } from './src/views/compose/screens/compose/ComposeScreen.component';
import { DashboardScreen } from './src/views/dashboard/screens/dashboard/DashboardScreen.component';
import { DrawerScreen } from './src/views/dashboard/screens/drawer/DrawerScreen.component';
import { PostScreen } from './src/views/post/screens/post/PostScreen.component';
import { ProfileScreen } from './src/views/profile/screens/profile/ProfileScreen.component';
import { FirstProfileScreen } from './src/views/reception/screens/first-profile/FirstProfileScreen.component';
import { LoginScreen } from './src/views/reception/screens/login/LoginScreen.component';
import { RegisterScreen } from './src/views/reception/screens/register/RegisterScreen.component';
import { SplashScreen } from './src/views/splash/screens/splash/SplashScreen.component';

Navigation.registerComponent(AppScreens.SplashScreen, () =>
	screenHOC(SplashScreen, appStore, true, true),
);
Navigation.registerComponent(AppScreens.DashboardScreen, () =>
	screenHOC(DashboardScreen, appStore),
);
Navigation.registerComponent(AppScreens.DrawerScreen, () =>
	screenHOC(DrawerScreen, appStore, false),
);
Navigation.registerComponent(AppScreens.ProfileScreen, () =>
	screenHOC(ProfileScreen, appStore),
);
Navigation.registerComponent(AppScreens.PostScreen, () =>
	screenHOC(PostScreen, appStore),
);
Navigation.registerComponent(AppScreens.LoginScreen, () =>
	screenHOC(LoginScreen, appStore),
);
Navigation.registerComponent(AppScreens.RegisterScreen, () =>
	screenHOC(RegisterScreen, appStore),
);
Navigation.registerComponent(AppScreens.FirstProfileScreen, () =>
	screenHOC(FirstProfileScreen, appStore),
);
Navigation.registerComponent(AppScreens.ComposeScreen, () =>
	screenHOC(ComposeScreen, appStore),
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
