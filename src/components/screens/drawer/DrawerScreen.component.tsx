import { DrawerHeader } from '@molecules/drawer-header/DrawerHeader.component';
import { DrawerMenu } from '@molecules/drawer-menu/DrawerMenu.component';
import { DrawerProfiles } from '@molecules/drawer-profiles/DrawerProfiles.component';
import { IProfile } from '@shared/types/entities/profile.interface';
import React, { useState } from 'react';
import { View } from 'react-native';
import { DrawerScreenStyles as styles } from './DrawerScreen.styles';

export interface DrawerScreenProps {
	currentProfile: IProfile;
	otherProfiles: IProfile[];
	componentId: string;
	onProfileSwitch: (profileId: string) => void;
	onProfileNav: (profileId: string, componentId: string) => void;
}

export const DrawerScreen: React.FC<DrawerScreenProps> = ({
	currentProfile,
	otherProfiles,
	componentId,
	onProfileNav,
	onProfileSwitch,
}) => {
	const [profilesTab, setProfilesTab] = useState(false);

	const items = [
		{
			key: 'settings',
			label: 'Settings',
			icon: 'cog',
		},
	];

	return (
		<View style={styles.root}>
			<DrawerHeader
				onTabSwitch={(tab) => setProfilesTab(tab)}
				profilesTab={profilesTab}
				currentProfile={currentProfile}
				otherProfiles={otherProfiles}
				componentId={componentId}
				onProfileSwitch={onProfileSwitch}
				onProfileNav={onProfileNav}
			/>
			{profilesTab ? <DrawerProfiles otherProfiles={otherProfiles} /> : <DrawerMenu items={items} />}
		</View>
	);
};
