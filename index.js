import { AppScreens } from '@core/app.screens';
import { appStore } from '@core/state/app.store';
import { screenHOC } from '@shared/utils/hoc/screenHOC/screenHOC';
import { Navigation } from 'react-native-navigation';
import { AskQuestionScreen } from './src/components/screens/ask-question/AskQuestionScreen.component';
import { ComposeScreen } from './src/components/screens/compose/ComposeScreen.component';
import { DashboardScreen } from './src/components/screens/dashboard/DashboardScreen.component';
import { DrawerScreen } from './src/components/screens/drawer/DrawerScreen.component';
import { FirstProfileScreen } from './src/components/screens/first-profile/FirstProfileScreen.component';
import { LoginScreen } from './src/components/screens/login/LoginScreen.component';
import { PostScreen } from './src/components/screens/post/PostScreen.component';
import { ProfileListScreen } from './src/components/screens/profile-list/ProfileListScreen.component';
import { ProfileScreen } from './src/components/screens/profile/ProfileScreen.component';
import { RegisterScreen } from './src/components/screens/register/RegisterScreen.component';
import { SearchScreen } from './src/components/screens/search/SearchScreen.component';
import { SplashScreen } from './src/views/splash/screens/splash/SplashScreen.component';

Navigation.registerComponent(
	AppScreens.SplashScreen,
	() => screenHOC(SplashScreen, appStore, true, true),
	() => SplashScreen,
);
Navigation.registerComponent(
	AppScreens.DashboardScreen,
	() => screenHOC(DashboardScreen, appStore),
	() => DashboardScreen,
);
Navigation.registerComponent(
	AppScreens.DrawerScreen,
	() => screenHOC(DrawerScreen, appStore, false),
	() => DrawerScreen,
);
Navigation.registerComponent(
	AppScreens.ProfileScreen,
	() => screenHOC(ProfileScreen, appStore),
	() => ProfileScreen,
);
Navigation.registerComponent(
	AppScreens.PostScreen,
	() => screenHOC(PostScreen, appStore),
	() => PostScreen,
);
Navigation.registerComponent(
	AppScreens.LoginScreen,
	() => screenHOC(LoginScreen, appStore),
	() => LoginScreen,
);
Navigation.registerComponent(
	AppScreens.RegisterScreen,
	() => screenHOC(RegisterScreen, appStore),
	() => RegisterScreen,
);
Navigation.registerComponent(
	AppScreens.FirstProfileScreen,
	() => screenHOC(FirstProfileScreen, appStore),
	() => FirstProfileScreen,
);
Navigation.registerComponent(
	AppScreens.ComposeScreen,
	() => screenHOC(ComposeScreen, appStore),
	() => ComposeScreen,
);
Navigation.registerComponent(
	AppScreens.SearchScreen,
	() => screenHOC(SearchScreen, appStore),
	() => SearchScreen,
);
Navigation.registerComponent(
	AppScreens.AskQuestionScreen,
	() => screenHOC(AskQuestionScreen, appStore),
	() => AskQuestionScreen,
);
Navigation.registerComponent(
	AppScreens.ProfileListScreen,
	() => screenHOC(ProfileListScreen, appStore),
	() => ProfileListScreen,
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
