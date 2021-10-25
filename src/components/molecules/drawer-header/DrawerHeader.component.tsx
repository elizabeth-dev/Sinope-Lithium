import { Avatar } from '@atoms/avatar/Avatar.component';
import { Icon } from '@atoms/icon/Icon.component';
import { Typography } from '@atoms/typography/Typography.component';
import { IProfile } from '@shared/types/entities/profile.interface';
import { theme } from '@theme/main.theme';
import { FC } from 'react';
import { Pressable, View } from 'react-native';
import { DrawerHeaderStyles as styles } from './DrawerHeader.styles';

export interface DrawerHeaderProps {
	profilesTab: boolean;
	currentProfile: IProfile;
	otherProfiles: IProfile[];
	onProfileSwitch: (profileId: string) => void;
	onProfileNav: (profileId: string) => void;
	onTabSwitch: (profileTab: boolean) => void;
}

export const DrawerHeader: FC<DrawerHeaderProps> = ({
	profilesTab,
	currentProfile,
	otherProfiles,
	onProfileSwitch,
	onProfileNav,
	onTabSwitch,
}) => (
	<Pressable style={styles.root} onPress={() => onTabSwitch(!profilesTab)}>
		<View style={styles.avatarBox}>
			<Avatar
				size={72}
				label={currentProfile.name[0].toUpperCase()}
				onPress={() => onProfileNav(currentProfile.id)}
			/>
			{otherProfiles.length !== 0 && (
				<View style={styles.otherProfiles}>
					{otherProfiles.map((profile) => (
						<Avatar
							size={48}
							label={profile.name[0].toUpperCase()}
							style={styles.otherProfileAvatar}
							onPress={() => onProfileSwitch(profile.id)}
							key={profile.id}
						/>
					))}
				</View>
			)}
		</View>
		<View style={styles.user}>
			<View style={styles.userInfo}>
				<Typography.Headline>{currentProfile.name}</Typography.Headline>
				<Typography.Subtitle>{`@${currentProfile.tag}`}</Typography.Subtitle>
			</View>
			<Icon icon={profilesTab ? 'chevron-up' : 'chevron-down'} color={theme.colors.lightForeground} />
		</View>
	</Pressable>
);
