import React from 'react';
import { NavigationFunctionComponent } from 'react-native-navigation';
import { ProfileList } from '@shared/components/profile-list/ProfileList.component';
import { useSelector } from 'react-redux';
import { AppState } from '@core/state/app.store';
import { fromProfile } from '@core/state/selectors/profile.selectors';

// How to pass refresh function? Will pull-to-refresh be needed?? (Probably not)
export interface ProfileListScreenProps {
	profileIds: string[];
}

export const ProfileListScreen: NavigationFunctionComponent<ProfileListScreenProps> = ({ profileIds, componentId }) => {
	const profiles = useSelector((state: AppState) => profileIds.map((id) => fromProfile.byId(state, id).profile));

	return <ProfileList profiles={profiles} stackId={componentId} />;
};
