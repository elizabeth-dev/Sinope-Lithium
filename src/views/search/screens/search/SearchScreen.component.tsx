import React from 'react';
import { NavigationState, SceneRendererProps, TabBar, TabView } from 'react-native-tab-view';
import { SceneRoute } from '@shared/types/scene-route.type';
import { NavigationFunctionComponent } from 'react-native-navigation';
import { Dimensions } from 'react-native';
import { Colors } from 'react-native-paper';
import { DashboardScreenStyles as styles } from '../../../dashboard/screens/dashboard/DashboardScreen.styles';
import { SearchPosts } from '../../components/search-posts/SearchPosts.component';
import { useSelector } from 'react-redux';
import { fromSearch } from '@core/state/selectors/search.selectors';
import { AppState } from '@core/state/app.store';
import { SearchProfiles } from '../../components/search-profiles/SearchProfiles.component';
import { Icon } from '@shared/components/icon/Icon.component';

const initialLayout = { width: Dimensions.get('window').width };

// TODO: Check color prop capabilities
const renderIcon = ({
	route,
	focused,
}: {
	route: SceneRoute; focused: boolean; color: string;
}) => {
	if (route.icon.startsWith('vanilla/')) {
		return <Icon
			icon={route.icon.split('/')[1]}
			namespace="vanilla"
			size={26}
			color={focused ? Colors.purple400 : undefined}
		/>;
	}

	return <Icon
		icon={route.icon}
		size={26}
		color={focused ? Colors.purple400 : undefined}
	/>;
};

const renderTabBar = (sceneProps: SceneRendererProps & {
	navigationState: NavigationState<SceneRoute>;
}) => <TabBar {...sceneProps} style={styles.tabBar} renderIcon={renderIcon} />;

export interface SearchScreenProps {
	searchTerm: string;
}

export const SearchScreen: NavigationFunctionComponent<SearchScreenProps> = ({
	componentId,
	searchTerm,
}) => {
	const search = useSelector((state: AppState) => fromSearch.result(state, searchTerm));

	const [index, setIndex] = React.useState(0);

	const [routes] = React.useState<SceneRoute[]>([
		{
			key: 'posts',
			accessibilityLabel: 'Posts',
			icon: 'message-text',
		}, {
			key: 'people',
			accessibilityLabel: 'People',
			icon: 'vanilla/people',
		},
	]);

	const renderScene = React.useCallback(({ route }: SceneRendererProps & { route: SceneRoute }) => {
		switch (route.key) {
			case 'posts':
				return <SearchPosts stackId={componentId} postIds={search.search.posts} />;
			case 'people':
				return <SearchProfiles stackId={componentId} profileIds={search.search.profiles} />;
			default:
				return null;
		}
	}, [componentId, search.search]);

	return (<TabView
		navigationState={{
			index,
			routes,
		}}
		renderScene={renderScene}
		onIndexChange={setIndex}
		initialLayout={initialLayout}
		renderTabBar={renderTabBar}
	/>);
};
