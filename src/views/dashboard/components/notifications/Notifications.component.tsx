import React from 'react';
import { FlatList, SafeAreaView, Text, TouchableHighlight, View } from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { Navigation } from 'react-native-navigation';
import { Colors } from 'react-native-paper';
import { SplashScreen } from '../../../splash/screens/splash/SplashScreen.component';

const DATA = [
	{
		id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
		title: 'First Item',
	},
	{
		id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
		title: 'Second Item',
	},
	{
		id: '58694a0f-3da1-471f-bd96-145571e29d72',
		title: 'Third Item',
	},
	{
		id: 'bd7afbea-c1b1-46c2-aed5-3ad53abb28ba',
		title: 'First Item',
	},
	{
		id: '3ac63afc-c605-48d3-a4f8-fbd91aa97f63',
		title: 'Second Item',
	},
	{
		id: '586b4a0f-3da1-471f-bd96-145571e29d72',
		title: 'Third Item',
	},
	{
		id: 'rd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
		title: 'First Item',
	},
	{
		id: '3ac68afr-c605-48d3-a4f8-fbd91aa97f63',
		title: 'Second Item',
	},
	{
		id: '5r694a0f-3da1-471f-bd96-145571e29d72',
		title: 'Third Item',
	},
	{
		id: 'bd7afrea-c1b1-46c2-aed5-3ad53abb28ba',
		title: 'First Item',
	},
	{
		id: '3acr3afc-c605-48d3-a4f8-fbd91aa97f63',
		title: 'Second Item',
	},
	{
		id: '586bra0f-3da1-471f-bd96-145571e29d72',
		title: 'Third Item',
	},
	{
		id: 'rd7acbea-c1b1-46c2-aed5-3adr3abb28ba',
		title: 'First Item',
	},
	{
		id: '3ac68afr-c605-48d3-a4f8-fbdr1aa97f63',
		title: 'Second Item',
	},
	{
		id: '5r694a0f-3da1-471f-bd96-145r71e29d72',
		title: 'Third Item',
	},
	{
		id: 'bd7afrea-c1b1-46c2-aed5-3adr3abb28ba',
		title: 'First Item',
	},
	{
		id: '3acr3afc-c605-48d3-a4f8-fbdr1aa97f63',
		title: 'Second Item',
	},
	{
		id: '586bra0f-3da1-471f-bd96-145r71e29d72',
		title: 'Third Item',
	},
];

const onClick = () => {
	console.log('Clicked');
};

function Item({ title }) {
	return (
		<TouchableHighlight underlayColor={ Colors.grey200 } onPress={ onClick }>
			<View
				style={ {
					backgroundColor: '#f9c2ff',
					padding: 20,
					marginVertical: 8,
					marginHorizontal: 16,
				} }
			>
				<Text style={ { fontSize: 32 } }>{ title }</Text>
			</View>
		</TouchableHighlight>
	);
}

export const Notifications: React.FC = () => {
	return (
		<SafeAreaView>
			<FlatList
				data={ DATA }
				renderItem={ ({ item }) => <Item title={ item.title } /> }
				keyExtractor={ item => item.id }
			/>
		</SafeAreaView>
	);
};
