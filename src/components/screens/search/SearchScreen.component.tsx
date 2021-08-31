import { Icon } from '@atoms/icon/Icon.component';
import { SearchPosts } from '@molecules/search-posts/SearchPosts.component';
import { SearchProfiles } from '@molecules/search-profiles/SearchProfiles.component';
import { FullPost } from '@shared/types/entities/post.interface';
import { IProfile } from '@shared/types/entities/profile.interface';
import { SceneRoute } from '@shared/types/scene-route.type';
import { colors } from '@theme/colors';
import React from 'react';
import { Dimensions } from 'react-native';
import { NavigationState, SceneRendererProps, TabBar, TabView } from 'react-native-tab-view';
import { SearchScreenStyles as styles } from './SearchScreen.styles';

const initialLayout = { width: Dimensions.get('window').width };

// TODO: Check color prop capabilities
const renderIcon = ({ route, focused }: { route: SceneRoute; focused: boolean; color: string }) => {
	if (route.icon.startsWith('vanilla/')) {
		return (
			<Icon
				icon={route.icon.split('/')[1]}
				namespace="vanilla"
				size={26}
				color={focused ? colors.purple400 : undefined}
			/>
		);
	}

	return <Icon icon={route.icon} size={26} color={focused ? colors.purple400 : undefined} />;
};

const renderTabBar = (
	sceneProps: SceneRendererProps & {
		navigationState: NavigationState<SceneRoute>;
	},
) => <TabBar {...sceneProps} style={styles.tabBar} renderIcon={renderIcon} />;

export interface SearchScreenProps {
	currentProfileId: string;
	posts: FullPost[];
	profiles: IProfile[];
	onPostNav: (postId: string) => void;
	onProfileNav: (profileId: string) => void;
	onReplyNav: (postId: string) => void;
	onLike: (postId: string) => void;
	onUnlike: (postId: string) => void;
}

export const SearchScreen: React.FC<SearchScreenProps> = ({
	currentProfileId,
	posts,
	profiles,
	onLike,
	onPostNav,
	onProfileNav,
	onReplyNav,
	onUnlike,
}) => {
	const [index, setIndex] = React.useState(0);

	const [routes] = React.useState<SceneRoute[]>([
		{
			key: 'posts',
			accessibilityLabel: 'Posts',
			icon: 'message-text',
		},
		{
			key: 'people',
			accessibilityLabel: 'People',
			icon: 'vanilla/people',
		},
	]);

	const renderScene = React.useCallback(
		({ route }: SceneRendererProps & { route: SceneRoute }) => {
			switch (route.key) {
				case 'posts':
					return (
						<SearchPosts
							currentProfileId={currentProfileId}
							posts={posts}
							onPostNav={onPostNav}
							onProfileNav={onProfileNav}
							onReplyNav={onReplyNav}
							onLike={onLike}
							onUnlike={onUnlike}
						/>
					);
				case 'people':
					return <SearchProfiles profiles={profiles} onProfileNav={onProfileNav} />;
				default:
					return null;
			}
		},
		[currentProfileId, onLike, onPostNav, onProfileNav, onReplyNav, onUnlike, posts, profiles],
	);

	return (
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
	);
};
