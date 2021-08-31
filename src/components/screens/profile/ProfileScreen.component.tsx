import { Fab } from '@atoms/fab/Fab.component';
import { PostList } from '@molecules/post-list/PostList.component';
import { ProfileHeader } from '@molecules/profile-header/ProfileHeader.component';
import { FullPost } from '@shared/types/entities/post.interface';
import { IProfile } from '@shared/types/entities/profile.interface';
import { theme } from '@theme/main.theme';
import React from 'react';
import { Animated, Dimensions, View } from 'react-native';
import { NavigationState, Route, SceneRendererProps, TabBar, TabView } from 'react-native-tab-view';
import { ProfileScreenStyles as styles } from './ProfileScreen.styles';

const initialLayout = { width: Dimensions.get('window').width };

export interface ProfileScreenProps {
	currentProfileId: string;
	profile: IProfile;
	isFetching: boolean;
	posts: FullPost[];
	onRefresh: () => void;
	onAskQuestionNav: () => void;
	onPostNav: (postId: string) => void;
	onProfileNav: (profileId: string) => void;
	onReplyNav: (postId: string) => void;
	onLike: (postId: string) => void;
	onUnlike: (postId: string) => void;
	onFollowingNav: () => void;
	onFollowersNav: () => void;
}

// TODO: [SLI-54] Refactor component
export const ProfileScreen: React.FC<ProfileScreenProps> = ({
	currentProfileId,
	profile,
	isFetching,
	posts,
	onRefresh,
	onAskQuestionNav,
	onPostNav,
	onProfileNav,
	onReplyNav,
	onLike,
	onUnlike,
	onFollowersNav,
	onFollowingNav,
}) => {
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
						onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scroll } } }], {
							useNativeDriver: true,
						})}
						containerPaddingTop={headerHeight + 48}
						progressViewOffset={headerHeight + 48}
						currentProfile={currentProfileId}
						posts={posts}
						onRefresh={onRefresh}
						refreshing={isFetching}
						onPostNav={onPostNav}
						onProfileNav={onProfileNav}
						onReplyNav={onReplyNav}
						onLike={onLike}
						onUnlike={onUnlike}
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
					profile={profile} // FIXME: Check undefined. & Fix followers logic
					isFetching={isFetching}
					headerY={headerY as unknown as number}
					onLayout={({ nativeEvent }) => setHeaderHeight(nativeEvent.layout.height)}
					onFollowersNav={onFollowersNav}
					onFollowingNav={onFollowingNav}
				/>
			</View>
			<Fab style={styles.fab} icon="comment-question" onPress={() => onAskQuestionNav()} />
		</>
	);
};
