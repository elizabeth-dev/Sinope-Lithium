import { DrawerHeader } from '@molecules/drawer-header/DrawerHeader.component';
import { DrawerMenu } from '@molecules/drawer-menu/DrawerMenu.component';
import { DrawerProfiles } from '@molecules/drawer-profiles/DrawerProfiles.component';
import React, { useState } from 'react';
import { View } from 'react-native';
import { NavigationFunctionComponent } from 'react-native-navigation';
import { DrawerScreenStyles as styles } from './DrawerScreen.styles';

export const DrawerScreen: NavigationFunctionComponent = ({ componentId }) => {
	const [profiles, setProfiles] = useState(false);

	return (
		<View style={styles.root}>
			<DrawerHeader componentId={componentId} onSwitch={() => setProfiles(!profiles)} profileTab={profiles} />
			{profiles ? <DrawerProfiles /> : <DrawerMenu />}
		</View>
	);
};
