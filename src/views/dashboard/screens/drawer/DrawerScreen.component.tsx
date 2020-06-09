import React from 'react';
import { FlatList } from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { Navigation } from 'react-native-navigation';
import { Drawer } from 'react-native-paper';
import { DrawerHeader } from '../../components/drawer-header/DrawerHeader.component';
import { DrawerScreenStyles as styles } from './DrawerScreen.styles';

export const DrawerScreen: React.FC = () => {
	const items = [
		{ key: 'settings', label: 'Settings', icon: 'settings' },
	];

	return (
		<FlatList
			data={ items }
			renderItem={ ({ item }) => <Drawer.Item icon={ item.icon } label={ item.label } /> }
			keyExtractor={ (item) => item.key }
			ListHeaderComponent={ DrawerHeader }
			showsVerticalScrollIndicator={ false }
			style={ styles.root }
		/>
	);
};

DrawerScreen.displayName = 'app.sinope.lithium.dashboard.DrawerScreen';
Navigation.registerComponent(DrawerScreen.displayName, () => gestureHandlerRootHOC(DrawerScreen));
