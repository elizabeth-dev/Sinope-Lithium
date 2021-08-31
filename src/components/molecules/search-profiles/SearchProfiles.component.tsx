import { ProfileList } from '@molecules/profile-list/ProfileList.component';
import { IProfile } from '@shared/types/entities/profile.interface';
import React from 'react';

export interface SearchProfilesProps {
	profiles: IProfile[];
	onProfileNav: (profileId: string) => void;
}

export const SearchProfiles: React.FC<SearchProfilesProps> = ({ profiles, onProfileNav }) => (
	<ProfileList profiles={profiles} onProfileNav={onProfileNav} />
);
