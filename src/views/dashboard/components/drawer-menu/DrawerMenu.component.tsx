import React from 'react';
import { FlatList } from 'react-native';
import { DrawerMenuStyles as styles } from './DrawerMenu.styles';
import { DrawerItem } from '@shared/components/drawer-item/DrawerItem.component';

export const DrawerMenu: React.FC = () => {
	const items = [
		{
			key: 'settings',
			label: 'Settings',
			icon: 'cog',
		},
	];

	return (<FlatList
			data={items}
			renderItem={({ item }) => <DrawerItem icon={item.icon} label={item.label} />}
			keyExtractor={(item) => item.key}
			showsVerticalScrollIndicator={false}
			style={styles.root}
		/>);
};
