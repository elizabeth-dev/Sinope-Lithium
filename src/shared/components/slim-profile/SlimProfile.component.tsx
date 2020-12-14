import { Avatar } from '../avatar/Avatar.component';
import { profileScreenLayer } from '@shared/navigation/layers/profile-screen.layer';
import React from 'react';
import { TouchableHighlight, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Colors } from 'react-native-paper';
import { SlimProfleStyles as styles } from './SlimProfle.styles';
import { IProfile } from '../../types/entities/profile.interface';
import { Typography } from '../typography/Typography.component';

export interface SlimProfileProps {
	// TODO: [SLI-45] Check if SlimProfile should get full profile or id only
	profile: IProfile;
	stackId: string;
}

export const SlimProfile: React.FC<SlimProfileProps> = ({
	profile,
	stackId,
}) => {

	const onProfileClick = () => Navigation.push(stackId, profileScreenLayer(profile.id));

	return (<TouchableHighlight
		underlayColor={Colors.grey200}
		onPress={onProfileClick}
	>
		<View style={styles.root}>
			<Avatar
				style={styles.avatar}
				label={profile.name[0].toUpperCase()}
			/>
			<View style={styles.body}>
				<View style={styles.header}>
					<View style={styles.userData}>
						<Typography.Headline>{profile.name}</Typography.Headline>
						<Typography.Subtitle>@{profile.tag}</Typography.Subtitle>
					</View>
				</View>
				<View style={styles.content}>
					<Typography.Body>{profile.description}</Typography.Body>
				</View>
			</View>
		</View>
	</TouchableHighlight>);
};
