import { ProfileActions } from '@actions/profile.actions';
import { AppState } from '@core/state/app.store';
import { FirstProfileScreen } from '@screens/first-profile/FirstProfileScreen.component';
import { useAppDispatch } from '@shared/hooks/use-shallow-selector/useAppDispatch.hook';
import { Keyboard } from 'react-native';
import { NavigationFunctionComponent } from 'react-native-navigation';
import { useSelector } from 'react-redux';

export const FirstProfileView: NavigationFunctionComponent = () => {
	const dispatcher = useAppDispatch();

	const error = useSelector((state: AppState) => state.reception.firstProfile.error);

	const onCreate = (name: string, tag: string) => {
		Keyboard.dismiss();
		dispatcher(ProfileActions.createFirst({ newProfile: { name, tag } }));
	};

	return <FirstProfileScreen error={error} onCreate={onCreate} />;
};
