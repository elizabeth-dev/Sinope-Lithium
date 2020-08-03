import React from 'react';
import { FlatList } from 'react-native';
import { Drawer } from 'react-native-paper';
import { DrawerHeader } from '../../components/drawer-header/DrawerHeader.component';
import { DrawerScreenStyles as styles } from './DrawerScreen.styles';
import { NavigationFunctionComponent } from 'react-native-navigation';

export const DrawerScreen: NavigationFunctionComponent = ({ componentId }) => {
	const items = [{ key: 'settings', label: 'Settings', icon: 'cog' }];

	return (
		<FlatList
			data={items}
			renderItem={({ item }) => (
				<Drawer.Item icon={item.icon} label={item.label} />
			)}
			keyExtractor={(item) => item.key}
			ListHeaderComponent={() => (
				<DrawerHeader componentId={componentId} />
			)}
			showsVerticalScrollIndicator={false}
			style={styles.root}
		/>
	);
};
