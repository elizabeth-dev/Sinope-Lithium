import { SelfActions } from '@actions/self.actions';
import { UserActions } from '@actions/user.actions';
import { fromProfile } from '@core/state/selectors/profile.selectors';
import { DrawerScreen } from '@screens/drawer/DrawerScreen.component';
import { nav } from '@shared/helper/navigation.helper';
import { useAppDispatch } from '@shared/hooks/useAppDispatch.hook';
import { useEffect } from 'react';
import { NavigationFunctionComponent } from 'react-native-navigation';
import { useSelector } from 'react-redux';

export const DrawerView: NavigationFunctionComponent = ({ componentId }) => {
	const dispatcher = useAppDispatch();

	// Check if better approach exists
	const currentProfile = useSelector(fromProfile.current);
	const otherProfiles = (useSelector(fromProfile.mine) ?? [])
		.filter((el) => el?.profile?.id !== currentProfile?.profile?.id)
		.map((el) => el.profile);

	const onProfileNav = (profileId: string) => nav.toProfile(profileId, componentId);

	const onProfileSwitch = (profileId: string) => {
		dispatcher(SelfActions.switchProfile({ profileId }));

		// TODO: Move to epic
		/* Navigation.mergeOptions('centerStack', {
			topBar: {
				title: { text: profile?.name },
				subtitle: { text: `@${profile?.tag}` },
			},
		}); */

		/* Navigation.mergeOptions(componentId, {
			sideMenu: { left: { visible: false } },
		}); */
	};

	useEffect(() => {
		if (!currentProfile?.profile) dispatcher(UserActions.initData());
	}, [currentProfile?.profile]);

	return (
		<DrawerScreen
			currentProfile={currentProfile?.profile}
			otherProfiles={otherProfiles}
			onProfileNav={onProfileNav}
			onProfileSwitch={onProfileSwitch}
		/>
	);
};
