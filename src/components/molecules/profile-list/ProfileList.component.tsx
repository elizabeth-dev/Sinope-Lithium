import { Divider } from '@atoms/divider/Divider.component';
import { SlimProfile } from '@molecules/slim-profile/SlimProfile.component';
import { IProfile } from '@shared/types/entities/profile.interface';
import React from 'react';
import { FlatList } from 'react-native';

interface ProfileListProps {
	profiles: IProfile[];
	onProfileNav: (profileId: string) => void;
	onRefresh?: () => void;
	refreshing?: boolean;
}

export const ProfileList: React.FC<ProfileListProps> = React.memo((props) => (
	<FlatList
		data={props.profiles}
		renderItem={(el) => <SlimProfile profile={el.item} onProfileNav={props.onProfileNav} />}
		keyExtractor={(item) => item.id}
		showsVerticalScrollIndicator={false}
		ItemSeparatorComponent={Divider}
		onRefresh={props.onRefresh}
		refreshing={props.refreshing}
	/>
));
