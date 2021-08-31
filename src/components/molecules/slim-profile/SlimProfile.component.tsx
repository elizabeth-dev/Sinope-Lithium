import { Avatar } from '@atoms/avatar/Avatar.component';
import { Typography } from '@atoms/typography/Typography.component';
import { IProfile } from '@shared/types/entities/profile.interface';
import { colors } from '@theme/colors';
import React from 'react';
import { TouchableHighlight, View } from 'react-native';
import { SlimProfileStyles as styles } from './SlimProfile.styles';

export interface SlimProfileProps {
	profile: IProfile;
	onProfileNav: (profileId: string) => void;
}

export const SlimProfile: React.FC<SlimProfileProps> = ({ profile, onProfileNav }) => (
	<TouchableHighlight underlayColor={colors.grey200} onPress={() => onProfileNav(profile.id)}>
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
