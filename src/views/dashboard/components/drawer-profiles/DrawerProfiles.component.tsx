import React from 'react';
import { FlatList } from 'react-native';
import { DrawerProfilesStyles as styles } from './DrawerProfiles.styles';
import { Drawer } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { fromProfile } from '@core/state/selectors/profile.selectors';

export const DrawerProfiles: React.FC = () => {
	const currentProfile = useSelector(fromProfile.current);
	const myProfiles = useSelector(fromProfile.mine)!.filter((el) => el.profile?.id !== currentProfile?.profile?.id);

	return (<>
			<FlatList
				data={myProfiles}
				renderItem={({ item }) => <Drawer.Item icon="account" label={item.profile.name} />}
				keyExtractor={(item) => item.profile.id}
				showsVerticalScrollIndicator={false}
				style={styles.root}
			/>
			<Drawer.Item label="Add account" />
		</>);
};
