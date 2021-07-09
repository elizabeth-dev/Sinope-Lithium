import { AppState } from '@core/state/app.store';
import { fromProfile } from '@core/state/selectors/profile.selectors';
import { ProfileList } from '@molecules/profile-list/ProfileList.component';
import React from 'react';
import { NavigationFunctionComponent } from 'react-native-navigation';
import { useSelector } from 'react-redux';

// How to pass refresh function? Will pull-to-refresh be needed?? (Probably not)
export interface ProfileListScreenProps {
	profileIds: string[];
}

export const ProfileListScreen: NavigationFunctionComponent<ProfileListScreenProps> = ({ profileIds, componentId }) => {
	const profiles = useSelector((state: AppState) => profileIds.map((id) => fromProfile.byId(state, id).profile));

	return <ProfileList profiles={profiles} stackId={componentId} />;
};
