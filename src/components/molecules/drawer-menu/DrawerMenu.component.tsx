import { DrawerItem } from '@molecules/drawer-item/DrawerItem.component';
import React from 'react';
import { FlatList } from 'react-native';
import { DrawerMenuStyles as styles } from './DrawerMenu.styles';

export interface DrawerMenuProps {
	items: { key: string; label: string; icon: string }[];
}

export const DrawerMenu: React.FC<DrawerMenuProps> = ({ items }) => (
	<FlatList
		data={items}
		renderItem={({ item }) => <DrawerItem icon={item.icon} label={item.label} />}
		keyExtractor={(item) => item.key}
		showsVerticalScrollIndicator={false}
		style={styles.root}
	/>
);
