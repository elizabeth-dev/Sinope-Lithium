import { ProfileActions } from '@core/actions/profile.actions';
import { fromProfile } from '@core/selectors/profile.selectors';
import { ProfileAvatar } from '@shared/components/profile-avatar/ProfileAvatar.component';
import { useAppDispatch } from '@shared/hooks/use-shallow-selector/useAppDispatch.hook';
import { profileScreenLayer } from '@shared/navigation/layers/profile-screen.layer';
import React from 'react';
import { View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Colors, Subheading, Title } from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { DrawerHeaderStyles as styles } from './DrawerHeader.styles';
import { IProfile } from '@shared/types/entities/profile.interface';

export interface DrawerHeaderProps {
	componentId: string;
}

export const DrawerHeader: React.FC<DrawerHeaderProps> = ({ componentId }) => {
	const dispatcher = useAppDispatch();

	const currentProfile = useSelector(fromProfile.current);
	const myProfiles = useSelector(fromProfile.mine).filter(
		(el) => el.profile?.id !== currentProfile?.profile?.id,
	);

	const onCurrentClick = () =>
		Navigation.push(
			'centerStack',
			profileScreenLayer(currentProfile?.profile?.id),
		);

	const onOtherClick = (profile: IProfile) => {
		dispatcher(ProfileActions.switch(profile?.id));
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

	return (
		<View style={styles.root}>
			<View style={styles.avatarBox}>
				<ProfileAvatar
					size={72}
					label={currentProfile?.profile?.name[0]?.toUpperCase()}
					onPress={onCurrentClick}
				/>
				{myProfiles.length !== 0 && (
					<View style={styles.otherProfiles}>
						{myProfiles.map((profile) => (
							<ProfileAvatar
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
					<Title>{currentProfile.profile.name}</Title>
					<Subheading style={{ color: Colors.grey600 }}>
						{`@${currentProfile.profile.tag}`}
					</Subheading>
				</View>
				<MaterialIcon
					name="chevron-down"
					size={24}
					color={Colors.grey600}
				/>
			</View>
		</View>
	);
};
