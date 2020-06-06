import React from 'react';
import { View } from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { Navigation } from 'react-native-navigation';
import { Avatar, Colors, Divider, Subheading, Title } from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { DrawerHeaderStyles as styles } from './DrawerHeader.styles';

export const DrawerHeader: React.FC = () => {
	return (
		<>
			<View style={ styles.root }>
				<View style={ styles.avatarBox }>
					<Avatar.Text size={ 64 } label="E" />
				</View>
				<View style={ styles.user }>
					<View style={ styles.userInfo }>
						<Title>Elizabeth</Title>
						<Subheading style={{color: Colors.grey600}}>@Elizabeth</Subheading>
					</View>
					<MaterialIcon name="chevron-down" size={24} color={Colors.grey600} />
				</View>
			</View>
			<Divider />
		</>
	);
};

DrawerHeader.displayName = '.DrawerHeader';
Navigation.registerComponent(DrawerHeader.displayName, () => gestureHandlerRootHOC(DrawerHeader));
