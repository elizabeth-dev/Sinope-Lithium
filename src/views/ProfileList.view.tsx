import { AppState } from '@core/state/app.store';
import { fromProfile } from '@core/state/selectors/profile.selectors';
import { ProfileListScreen } from '@screens/profile-list/ProfileListScreen.component';
import { nav } from '@shared/helper/navigation.helper';
import { NavigationFunctionComponent } from 'react-native-navigation';
import { useSelector } from 'react-redux';

export interface ProfileListViewProps {
	profileIds: string[];
}

export const ProfileListView: NavigationFunctionComponent<ProfileListViewProps> = ({ profileIds, componentId }) => {
	const profiles = useSelector((state: AppState) => profileIds.map((id) => fromProfile.byId(state, id).profile));

	const onProfileNav = (profileId: string) => nav.toProfile(profileId, componentId);

	return <ProfileListScreen profiles={profiles} onProfileNav={onProfileNav} />;
};
