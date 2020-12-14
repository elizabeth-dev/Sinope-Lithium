import { fromProfile } from '@core/state/selectors/profile.selectors';
import { Avatar } from '@shared/components/avatar/Avatar.component';
import { useAppDispatch } from '@shared/hooks/use-shallow-selector/useAppDispatch.hook';
import { profileScreenLayer } from '@shared/navigation/layers/profile-screen.layer';
import React from 'react';
import { GestureResponderEvent, Pressable, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Colors } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { DrawerHeaderStyles as styles } from './DrawerHeader.styles';
import { IProfile } from '@shared/types/entities/profile.interface';
import { SelfActions } from '@core/state/actions/self.actions';
import { Typography } from '@shared/components/typography/Typography.component';
import { Icon } from '@shared/components/icon/Icon.component';

export interface DrawerHeaderProps {
	componentId: string;
	onSwitch: (ev: GestureResponderEvent) => void;
	profileTab: boolean;
}

export const DrawerHeader: React.FC<DrawerHeaderProps> = ({ componentId, onSwitch, profileTab }) => {
	const dispatcher = useAppDispatch();

	const currentProfile = useSelector(fromProfile.current);
	const myProfiles = useSelector(fromProfile.mine)!.filter((el) => el.profile?.id !== currentProfile?.profile?.id);

	const onCurrentClick = () => Navigation.push('centerStack',
		profileScreenLayer(currentProfile?.profile?.id),
	);

	const onOtherClick = (profile: IProfile) => {
		dispatcher(SelfActions.switchProfile(profile?.id));
		Navigation.mergeOptions('centerStack', {
			topBar: {
				title: { text: profile?.name },
				subtitle: { text: `@${profile?.tag}` },
			},
		});
		Navigation.mergeOptions(componentId, {
			sideMenu: { left: { visible: false } },
		});
	};

	return (<Pressable style={styles.root} onPress={onSwitch}>
			<View style={styles.avatarBox}>
				<Avatar
					size={72}
					label={currentProfile?.profile?.name[0]?.toUpperCase()}
					onPress={onCurrentClick}
				/>
				{myProfiles.length !== 0 && (<View style={styles.otherProfiles}>
						{myProfiles.map((profile) => (<Avatar
								size={48}
								label={profile.profile?.name[0]?.toUpperCase()}
								style={styles.otherProfileAvatar}
								onPress={() => onOtherClick(profile.profile)}
								key={profile.profile.id}
							/>
						))}
					</View>
				)}
			</View>
			<View style={styles.user}>
				<View style={styles.userInfo}>
					<Typography.Headline>{currentProfile.profile.name}</Typography.Headline>
					<Typography.Subtitle>{`@${currentProfile.profile.tag}`}</Typography.Subtitle>
				</View>
				<Icon
					icon={profileTab ? 'chevron-up' : 'chevron-down'}
					color={Colors.grey600}
				/>
			</View>
		</Pressable>
	);
};
