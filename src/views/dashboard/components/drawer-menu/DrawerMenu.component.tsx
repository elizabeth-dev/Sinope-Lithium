import React from 'react';
import { FlatList } from 'react-native';
import { DrawerMenuStyles as styles } from './DrawerMenu.styles';
import { Drawer } from 'react-native-paper';

export const DrawerMenu: React.FC = () => {
	const items = [
		{ key: 'settings', label: 'Settings', icon: 'settings' },
	];

	return (
		<FlatList
			data={ items }
			renderItem={ ({ item }) => <Drawer.Item icon={ item.icon } label={ item.label } /> }
			keyExtractor={ (item) => item.key }
			showsVerticalScrollIndicator={ false }
			style={ styles.root }
		/>
	);
};
