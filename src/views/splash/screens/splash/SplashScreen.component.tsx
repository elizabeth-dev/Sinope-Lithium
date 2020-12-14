import { AppState, persistorPromise } from '@core/state/app.store';
import { fromProfile } from '@core/state/selectors/profile.selectors';
import { dashboardRoot } from '@shared/navigation/roots/dashboard.root';
import { loginRoot } from '@shared/navigation/roots/login.root';
import React from 'react';
import { Navigation } from 'react-native-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { SplashLoading } from '../../components/splash-loading/SplashLoading.component';

export const SplashScreen: React.FC = () => {
	const loggedIn = useSelector<AppState>((state) => state.auth.loggedIn);
	const currentProfile = useSelector(fromProfile.current);

	if (!loggedIn) {
		Navigation.setRoot(loginRoot());
	} else {
		Promise.all([
			MaterialCommunityIcons.getImageSource('menu', 25),
			MaterialCommunityIcons.getImageSource('message-reply', 25),
			persistorPromise,
		]).then(([menuIcon, composeIcon]) => {
			Navigation.setRoot(dashboardRoot(
				menuIcon,
				composeIcon,
				currentProfile?.profile?.name,
				currentProfile?.profile?.tag,
			));
		});
	}

	return <SplashLoading />;
};
