import { AppScreens } from '@core/app.screens';
import React from 'react';
import { FlatList } from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { Navigation } from 'react-native-navigation';
import { Drawer } from 'react-native-paper';
import { DrawerHeader } from '../../components/drawer-header/DrawerHeader.component';
import { DrawerScreenStyles as styles } from './DrawerScreen.styles';

export const DrawerScreen: React.FC = () => {
	const items = [
		{ key: 'home', label: 'Item 1', icon: 'home' },
		{ key: 'notifications', label: 'Item 2', icon: 'bell' },
		{ key: 'placeholder', label: 'Item 3' },
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

Navigation.registerComponent(AppScreens.DrawerScreen, () => gestureHandlerRootHOC(DrawerScreen));
