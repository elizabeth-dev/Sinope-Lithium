import { PostActions } from '@actions/post.actions';
import { ProfileActions } from '@actions/profile.actions';
import { Fab } from '@atoms/fab/Fab.component';
import { AppState } from '@core/state/app.store';
import { fromPost } from '@core/state/selectors/post.selectors';
import { fromProfile } from '@core/state/selectors/profile.selectors';
import { PostList } from '@molecules/post-list/PostList.component';
import { ProfileHeader } from '@molecules/profile-header/ProfileHeader.component';
import { useAppDispatch } from '@shared/hooks/use-shallow-selector/useAppDispatch.hook';
import { askQuestionScreenLayer } from '@shared/navigation/layers/ask-question-screen.layer';
import { theme } from '@theme/main.theme';
import React from 'react';
import { Animated, Dimensions, View } from 'react-native';
import {
	Navigation,
	NavigationButtonPressedEvent,
	NavigationComponentListener,
	NavigationFunctionComponent,
} from 'react-native-navigation';
import { NavigationState, Route, SceneRendererProps, TabBar, TabView } from 'react-native-tab-view';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { ProfileScreenStyles as styles } from './ProfileScreen.styles';

const initialLayout = { width: Dimensions.get('window').width };

export interface ProfileScreenProps {
	profileId: string;
}

// TODO: [SLI-54] Refactor component
export const ProfileScreen: NavigationFunctionComponent<ProfileScreenProps> = ({ profileId, componentId }) => {
	const dispatcher = useAppDispatch();

	const selectPostsByProfile = React.useMemo(() => fromPost.make.byProfile(), []);

	const [index, setIndex] = React.useState(0);
	const [routes] = React.useState<Route[]>([
		{
			key: 'posts',
			title: 'Posts',
		},
		{
			key: 'media',
			title: 'Media',
		},
		{
			key: 'likes',
			title: 'Likes',
		},
	]);
	const [headerHeight, setHeaderHeight] = React.useState(0);

	const profile = useSelector((state: AppState) => fromProfile.byId(state, profileId));
	const currentProfile = useSelector(fromProfile.currentId);
	const profilePosts = useSelector((state: AppState) => selectPostsByProfile(state, profileId));

	const refreshProfile = React.useCallback(
		(_profileId: string, _currentProfile: string) => {
			dispatcher(ProfileActions.request({ profile: _profileId, fromProfile: _currentProfile }));
			dispatcher(PostActions.requestFromProfile({ profile: _profileId }));
		},
		[dispatcher],
	);

	React.useEffect(() => {
		if (profileId !== currentProfile) {
			if (!profile.profile.followingThem) {
				MaterialIcons.getImageSource('person-add', 25).then((followIcon) =>
					Navigation.mergeOptions(componentId, {
						topBar: {
							rightButtons: [
								{
									id: 'FOLLOW_PROFILE',
									icon: followIcon,
									text: 'Follow',
								},
							],
						},
					}),
				);
			} else {
				MaterialIcons.getImageSource('person-remove', 25).then((followIcon) =>
					Navigation.mergeOptions(componentId, {
						topBar: {
							rightButtons: [
								{
									id: 'UNFOLLOW_PROFILE',
									icon: followIcon,
									text: 'Unfollow',
								},
							],
						},
					}),
				);
			}
		}
	}, [profile.profile.followingThem, currentProfile, profileId, componentId]);

	React.useEffect(() => {
		const listener: NavigationComponentListener = {
			navigationButtonPressed: (event: NavigationButtonPressedEvent) => {
				if (event.buttonId === 'FOLLOW_PROFILE') {
					dispatcher(ProfileActions.follow({ fromProfile: currentProfile, toProfile: profileId }));
				} else if (event.buttonId === 'UNFOLLOW_PROFILE') {
					dispatcher(ProfileActions.unfollow({ fromProfile: currentProfile, toProfile: profileId }));
				}
			},
		};

		const subscription = Navigation.events().registerComponentListener(listener, componentId);
		return () => {
			subscription.remove();
		};
	}, [componentId, currentProfile, dispatcher, profileId]);

	React.useEffect(() => refreshProfile(profileId, currentProfile), [refreshProfile, profileId, currentProfile]);

	const scroll = React.useRef(new Animated.Value(0)).current;
	const headerY = scroll.interpolate({
		inputRange: [0, headerHeight],
		outputRange: [0, headerHeight * -1],
		extrapolateRight: 'clamp',
	});
	const tabBarY = scroll.interpolate({
		inputRange: [0, headerHeight],
		outputRange: [headerHeight, 0],
		extrapolateRight: 'clamp',
	});

	// Fix TabBar padding
	const renderScene = (props: SceneRendererProps & { route: Route }) => {
		switch (props.route.key) {
			case 'posts':
				return (
					<PostList
						currentProfile={currentProfile}
						posts={profilePosts?.posts?.map((postEntity) => postEntity.post) ?? []}
						stackId={componentId}
						onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scroll } } }], {
							useNativeDriver: true,
						})}
						containerPaddingTop={headerHeight + 48}
						progressViewOffset={headerHeight + 48}
					/>
				);
			default:
				return null;
		}
	};

	const renderTabBar = (
		sceneProps: SceneRendererProps & {
			navigationState: NavigationState<Route>;
		},
	) => (
		<Animated.View
			style={[
				styles.tabBarContainer,
				{
					transform: [{ translateY: tabBarY as unknown as number }],
				},
			]}>
			<TabBar
				{...sceneProps}
				style={styles.tabBar}
				activeColor={theme.colors.foreground}
				inactiveColor={theme.colors.lightForeground}
				indicatorStyle={styles.tabBarIndicator}
			/>
		</Animated.View>
	);

	const onCompose = () => Navigation.push(componentId, askQuestionScreenLayer(profileId));

	return (
		<>
			<View style={styles.root}>
				{headerHeight !== 0 && (
					<TabView
						navigationState={{
							index,
							routes,
						}}
						renderScene={renderScene}
						onIndexChange={setIndex}
						initialLayout={initialLayout}
						renderTabBar={renderTabBar}
					/>
				)}
				<ProfileHeader
					stackId={componentId}
					profile={profile?.profile} // FIXME: Check undefined. & Fix followers logic
					isFetching={(profile?.isFetching ?? true) || (profilePosts?.isFetching ?? true)}
					headerY={headerY as unknown as number}
					onLayout={({ nativeEvent }) => setHeaderHeight(nativeEvent.layout.height)}
				/>
			</View>
			<Fab style={styles.fab} icon="comment-question" onPress={onCompose} />
		</>
	);
};
