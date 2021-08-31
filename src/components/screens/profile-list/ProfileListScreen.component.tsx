import { ProfileList } from '@molecules/profile-list/ProfileList.component';
import { IProfile } from '@shared/types/entities/profile.interface';
import React from 'react';

// How to pass refresh function? Will pull-to-refresh be needed?? (Probably not)
export interface ProfileListScreenProps {
	profiles: IProfile[];
	onProfileNav: (profileId: string) => void;
}

export const ProfileListScreen: React.FC<ProfileListScreenProps> = ({ profiles, onProfileNav }) => (
	<ProfileList profiles={profiles} onProfileNav={onProfileNav} />
);
