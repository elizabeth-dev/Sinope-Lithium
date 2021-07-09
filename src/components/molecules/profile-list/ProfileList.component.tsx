import { Divider } from '@atoms/divider/Divider.component';
import { SlimProfile } from '@molecules/slim-profile/SlimProfile.component';
import { IProfile } from '@shared/types/entities/profile.interface';
import React from 'react';
import { FlatList } from 'react-native';

interface ProfileListProps {
	profiles: IProfile[];
	onRefresh?: () => void;
	refreshing?: boolean;
	stackId: string;
}

export const ProfileList: React.FC<ProfileListProps> = React.memo((props) => (
	<FlatList
		data={props.profiles}
		extraData={props.stackId}
		renderItem={(el) => <SlimProfile stackId={props.stackId} profile={el.item} />}
		keyExtractor={(item) => item.id}
		showsVerticalScrollIndicator={false}
		ItemSeparatorComponent={Divider}
		onRefresh={props.onRefresh}
		refreshing={props.refreshing}
	/>
));
