import { AppViews } from '@core/app.views';
import { appStore } from '@core/state/app.store';
import { screenHOC } from '@shared/utils/hoc/screenHOC/screenHOC';
import { Navigation } from 'react-native-navigation';
import { AskQuestionView } from './src/views/AskQuestion.view';
import { ComposeView } from './src/views/Compose.view';
import { DashboardView } from './src/views/Dashboard.view';
import { DrawerView } from './src/views/Drawer.view';
import { FirstProfileView } from './src/views/FirstProfile.view';
import { LoginView } from './src/views/Login.view';
import { PostView } from './src/views/Post.view';
import { ProfileView } from './src/views/Profile.view';
import { ProfileListView } from './src/views/ProfileList.view';
import { RegisterView } from './src/views/Register.view';
import { SearchView } from './src/views/Search.view';
import { SplashScreen } from './src/views/splash/screens/splash/SplashScreen.component';

Navigation.registerComponent(
	AppViews.SplashView,
	() => screenHOC(SplashScreen, appStore, true, true),
	() => SplashScreen,
);
Navigation.registerComponent(
	AppViews.DashboardView,
	() => screenHOC(DashboardView, appStore),
	() => DashboardView,
);
Navigation.registerComponent(
	AppViews.DrawerView,
	() => screenHOC(DrawerView, appStore, false),
	() => DrawerView,
);
Navigation.registerComponent(
	AppViews.ProfileView,
	() => screenHOC(ProfileView, appStore),
	() => ProfileView,
);
Navigation.registerComponent(
	AppViews.PostView,
	() => screenHOC(PostView, appStore),
	() => PostView,
);
Navigation.registerComponent(
	AppViews.LoginView,
	() => screenHOC(LoginView, appStore),
	() => LoginView,
);
Navigation.registerComponent(
	AppViews.RegisterView,
	() => screenHOC(RegisterView, appStore),
	() => RegisterView,
);
Navigation.registerComponent(
	AppViews.FirstProfileView,
	() => screenHOC(FirstProfileView, appStore),
	() => FirstProfileView,
);
Navigation.registerComponent(
	AppViews.ComposeView,
	() => screenHOC(ComposeView, appStore),
	() => ComposeView,
);
Navigation.registerComponent(
	AppViews.SearchView,
	() => screenHOC(SearchView, appStore),
	() => SearchView,
);
Navigation.registerComponent(
	AppViews.AskQuestionView,
	() => screenHOC(AskQuestionView, appStore),
	() => AskQuestionView,
);
Navigation.registerComponent(
	AppViews.ProfileListView,
	() => screenHOC(ProfileListView, appStore),
	() => ProfileListView,
);

Navigation.events().registerAppLaunchedListener(() => {
	Navigation.setRoot({
		root: {
			component: {
				name: AppViews.SplashView,
			},
		},
	});
});
