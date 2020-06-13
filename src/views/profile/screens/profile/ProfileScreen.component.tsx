import { AppState } from '@core/app.store';
import { PostList } from '@shared/components/post-list/PostList.component';
import React from 'react';
import { Animated, Dimensions, ToastAndroid, View } from 'react-native';
import { NavigationComponentProps } from 'react-native-navigation';
import { NavigationState, Route, SceneRendererProps, TabBar, TabView } from 'react-native-tab-view';
import { useSelector } from 'react-redux';
import { ProfileHeader } from '../../components/ProfileHeader.component';
import { ProfileScreenStyles as styles } from './ProfileScreen.styles';

const initialLayout = { width: Dimensions.get('window').width };

export interface ProfileScreenProps {
	profileId: string;
}

export const ProfileScreen: React.FC<ProfileScreenProps & NavigationComponentProps> = ({ profileId, componentId }) => {
	const [index, setIndex] = React.useState(0);
	const [routes] = React.useState<Route[]>([{ key: 'posts', title: 'Posts' }]);
	const [headerHeight, setHeaderHeight] = React.useState(0);
	const [refreshing, setRefreshing] = React.useState(false);
	const { name, tag, description } = useSelector((state: AppState) => state.profile.profilesById[profileId].profile);
	const posts = useSelector((state: AppState) =>
		state.post.postsByProfile[profileId].posts.map((postId) => state.post.postsById[postId].post),
	);

	const onRefresh = () => {
		setRefreshing(true);
		ToastAndroid.show('Refreshing...', ToastAndroid.SHORT);
		setTimeout(() => setRefreshing(false), 3000);
	};

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
						posts={posts}
						stackId={componentId}
						onRefresh={onRefresh}
						refreshing={refreshing}
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

	const renderTabBar = (sceneProps: SceneRendererProps & { navigationState: NavigationState<Route> }) => (
		<Animated.View
			style={[
				styles.tabBarContainer,
				{
					transform: [{ translateY: (tabBarY as unknown) as number }],
				},
			]}>
			<TabBar {...sceneProps} style={styles.tabBar} labelStyle={styles.tabBarLabel} />
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
				name={name}
				tag={tag}
				description={description}
				headerY={(headerY as unknown) as number}
				onLayout={({ nativeEvent }) => setHeaderHeight(nativeEvent.layout.height)}
			/>
		</View>
	);
};
