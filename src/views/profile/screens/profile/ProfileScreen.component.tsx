import { PostActions } from '@core/actions/post.actions';
import { ProfileActions } from '@core/actions/profile.actions';
import { AppState } from '@core/app.store';
import { fromPost } from '@core/selectors/post.selectors';
import { fromProfile } from '@core/selectors/profile.selectors';
import { PostList } from '@shared/components/post-list/PostList.component';
import { useAppDispatch } from '@shared/hooks/use-shallow-selector/useAppDispatch.hook';
import React from 'react';
import { Animated, Dimensions, View } from 'react-native';
import { NavigationFunctionComponent } from 'react-native-navigation';
import {
	NavigationState,
	Route,
	SceneRendererProps,
	TabBar,
	TabView,
} from 'react-native-tab-view';
import { useSelector } from 'react-redux';
import { ProfileHeader } from '../../components/ProfileHeader.component';
import { ProfileScreenStyles as styles } from './ProfileScreen.styles';

const initialLayout = { width: Dimensions.get('window').width };

export interface ProfileScreenProps {
	profileId: string;
}

// TODO: [SLI-54] Refactor component
export const ProfileScreen: NavigationFunctionComponent<ProfileScreenProps> = ({
	profileId,
	componentId,
}) => {
	const dispatcher = useAppDispatch();

	const selectPostsByProfile = React.useMemo(
		() => fromPost.make.byProfile(),
		[],
	);

	const [index, setIndex] = React.useState(0);
	const [routes] = React.useState<Route[]>([
		{ key: 'posts', title: 'Posts' },
	]);
	const [headerHeight, setHeaderHeight] = React.useState(0);

	const refreshProfile = React.useCallback(
		(_profileId) => {
			dispatcher(ProfileActions.request(_profileId));
			dispatcher(PostActions.requestFromProfile(_profileId));
		},
		[dispatcher],
	);

	React.useEffect(() => refreshProfile(profileId), [
		refreshProfile,
		profileId,
	]);

	const profile = useSelector((state: AppState) =>
		fromProfile.byId(state, profileId),
	);

	const currentProfile = useSelector(fromProfile.currentId);

	const profilePosts = useSelector((state: AppState) =>
		selectPostsByProfile(state, profileId),
	);

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
						posts={
							profilePosts?.posts?.map(
								(postEntity) => postEntity.post,
							) ?? []
						}
						stackId={componentId}
						onScroll={Animated.event(
							[{ nativeEvent: { contentOffset: { y: scroll } } }],
							{
								useNativeDriver: true,
							},
						)}
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
					transform: [{ translateY: (tabBarY as unknown) as number }],
				},
			]}>
			<TabBar
				{...sceneProps}
				style={styles.tabBar}
				labelStyle={styles.tabBarLabel}
			/>
		</Animated.View>
	);

	return (
		<View style={styles.root}>
			{headerHeight !== 0 && (
				<TabView
					navigationState={{ index, routes }}
					renderScene={renderScene}
					onIndexChange={setIndex}
					initialLayout={initialLayout}
					renderTabBar={renderTabBar}
				/>
			)}
			<ProfileHeader
				name={profile?.profile?.name}
				tag={profile?.profile?.tag}
				description={profile?.profile?.description}
				isFetching={
					(profile?.isFetching ?? true) ||
					(profilePosts?.isFetching ?? true)
				}
				headerY={(headerY as unknown) as number}
				onLayout={({ nativeEvent }) =>
					setHeaderHeight(nativeEvent.layout.height)
				}
			/>
		</View>
	);
};
