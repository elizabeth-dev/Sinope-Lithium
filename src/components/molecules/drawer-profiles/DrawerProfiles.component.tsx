import { Divider } from '@atoms/divider/Divider.component';
import { DrawerItem } from '@molecules/drawer-item/DrawerItem.component';
import { IProfile } from '@shared/types/entities/profile.interface';
import React from 'react';
import { FlatList } from 'react-native';
import { DrawerProfilesStyles as styles } from './DrawerProfiles.styles';

export interface DrawerProfilesProps {
	otherProfiles: IProfile[];
}

export const DrawerProfiles: React.FC<DrawerProfilesProps> = ({ otherProfiles }) => (
	<>
		<FlatList
			data={otherProfiles}
			renderItem={({ item }) => <DrawerItem icon="account" label={item.name} />}
			keyExtractor={(item) => item.id}
			showsVerticalScrollIndicator={false}
			style={styles.root}
		/>
		<Divider />
		<DrawerItem label="Add account" />
	</>
);
