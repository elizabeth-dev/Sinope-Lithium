import { ProfileAvatar } from '@shared/components/profile-avatar/ProfileAvatar.component';
import { profileScreenLayer } from '@shared/navigation/layers/profile-screen.layer';
import React from 'react';
import { ToastAndroid, TouchableHighlight, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Colors, Paragraph, Subheading, Title } from 'react-native-paper';
import { SlimProfleStyles as styles } from './SlimProfle.styles';
import { IProfile } from '../../types/entities/profile.interface';

export interface SlimProfileProps {
	// TODO: [SLI-45] Check if SlimProfile should get full profile or id only
	profile: IProfile;
	stackId: string;
}

const onClick = () => {
	ToastAndroid.show('Clicked!', ToastAndroid.SHORT);
};
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
			<ProfileAvatar
				style={styles.avatar}
				label={profile.name[0].toUpperCase()}
				size={48}
			/>
			<View style={styles.body}>
				<View style={styles.header}>
					<View style={styles.userData}>
						<Title style={styles.name}>
							{profile.name}
						</Title>
						<Subheading style={styles.username}>
							{`@${profile.tag}`}
						</Subheading>
					</View>
					{/*<IconButton
							icon="dots-vertical"
							color={Colors.grey600}
							size={24}
							onPress={onClick}
						/>*/}
				</View>
				<View style={styles.content}>
					<Paragraph style={styles.text}>
						{profile.description}
					</Paragraph>
				</View>
			</View>
		</View>
	</TouchableHighlight>);
};
