import { Avatar } from '@atoms/avatar/Avatar.component';
import { Typography } from '@atoms/typography/Typography.component';
import { profileScreenLayer } from '@shared/navigation/layers/profile-screen.layer';
import { IProfile } from '@shared/types/entities/profile.interface';
import { colors } from '@theme/colors';
import React from 'react';
import { TouchableHighlight, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { SlimProfileStyles as styles } from './SlimProfile.styles';

export interface SlimProfileProps {
	// TODO: [SLI-45] Check if SlimProfile should get full profile or id only
	profile: IProfile;
	stackId: string;
}

export const SlimProfile: React.FC<SlimProfileProps> = ({ profile, stackId }) => {
	const onProfileClick = () => Navigation.push(stackId, profileScreenLayer(profile.id));

	return (
		<TouchableHighlight underlayColor={colors.grey200} onPress={onProfileClick}>
			<View style={styles.root}>
				<Avatar style={styles.avatar} label={profile.name[0].toUpperCase()} />
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
		</TouchableHighlight>
	);
};
