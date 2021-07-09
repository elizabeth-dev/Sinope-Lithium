import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '@core/state/app.store';
import { fromProfile } from '@core/state/selectors/profile.selectors';
import { ProfileList } from '@shared/components/profile-list/ProfileList.component';

export interface SearchProfilesProps {
	stackId: string;
	profileIds: string[];
}

export const SearchProfiles: React.FC<SearchProfilesProps> = ({
	stackId,
	profileIds,
}) => {
	const profiles = useSelector((state: AppState) => profileIds.map((id) => fromProfile.byId(state, id).profile));

	return (<ProfileList profiles={profiles} stackId={stackId} />);
};
