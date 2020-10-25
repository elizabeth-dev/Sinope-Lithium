import React, { useState } from 'react';
import { View } from 'react-native';
import { DrawerHeader } from '../../components/drawer-header/DrawerHeader.component';
import { DrawerScreenStyles as styles } from './DrawerScreen.styles';
import { NavigationFunctionComponent } from 'react-native-navigation';
import { DrawerMenu } from '../../components/drawer-menu/DrawerMenu.component';
import { DrawerProfiles } from '../../components/drawer-profiles/DrawerProfiles.component';

export const DrawerScreen: NavigationFunctionComponent = ({ componentId }) => {
	const [profiles, setProfiles] = useState(false);

	return (<View style={styles.root}>
			<DrawerHeader
				componentId={componentId}
				onSwitch={() => setProfiles(!profiles)}
				profileTab={profiles}
			/>
			{profiles ? <DrawerProfiles /> : <DrawerMenu />}
		</View>);
};
