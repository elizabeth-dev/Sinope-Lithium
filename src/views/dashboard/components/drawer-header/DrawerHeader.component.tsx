import React from 'react';
import { View } from 'react-native';
import { Avatar, Colors, Subheading, Title } from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { DrawerHeaderStyles as styles } from './DrawerHeader.styles';
import { useSelector } from 'react-redux';
import { AppState } from '@core/app.store';

export const DrawerHeader: React.FC = () => {
	const otherProfiles = useSelector((state: AppState) =>
		state.profile.self.profiles
			.filter((profile) => profile !== state.profile.self.current)
			.map((profile) => state.profile.profilesById[profile]),
	);
	const currentProfile = useSelector(
		(state: AppState) =>
			state.profile.profilesById[state.profile.self.current],
	);

	return (
		<View style={styles.root}>
			<View style={styles.avatarBox}>
				<Avatar.Text
					size={72}
					label={currentProfile.profile.name[0].toUpperCase()}
				/>
				{otherProfiles.length !== 0 && (
					<View style={styles.otherProfiles}>
						{otherProfiles.map((profile) => (
							<Avatar.Text
								size={48}
								label={profile.profile.name[0].toUpperCase()}
								style={styles.otherProfileAvatar}
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
