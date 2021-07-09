import { Icon } from '@atoms/icon/Icon.component';
import { Home } from '@molecules/home/Home.component';
import { Questions } from '@molecules/questions/Questions.component';
import { Search } from '@molecules/search/Search.component';
import { SceneRoute } from '@shared/types/scene-route.type';
import React from 'react';
import { Dimensions } from 'react-native';
import {
	Navigation,
	NavigationButtonPressedEvent,
	NavigationComponentListener,
	NavigationFunctionComponent,
} from 'react-native-navigation';
import { NavigationState, SceneRendererProps, TabBar, TabView } from 'react-native-tab-view';
import { DashboardScreenStyles as styles } from './DashboardScreen.styles';

const initialLayout = { width: Dimensions.get('window').width };

// TODO: Check color prop capabilities
const renderIcon = ({ route, focused }: { route: SceneRoute; focused: boolean; color: string }) => (
	<Icon icon={route.icon} size={26} style={[styles.tabBarIcon, ...(focused ? [styles.tabBarIconFocus] : [])]} />
);

const renderTabBar = (
	sceneProps: SceneRendererProps & {
		navigationState: NavigationState<SceneRoute>;
	},
) => <TabBar {...sceneProps} style={styles.tabBar} renderIcon={renderIcon} indicatorStyle={styles.tabBarIndicator} />;

export const DashboardScreen: NavigationFunctionComponent = ({ componentId }) => {
	const [index, setIndex] = React.useState(0);

	const [routes] = React.useState<SceneRoute[]>([
		{
			key: 'home',
			accessibilityLabel: 'Home',
			icon: 'home',
		},
		{
			key: 'questions',
			accessibilityLabel: 'Questions',
			icon: 'comment-question',
		},
		{
			key: 'search',
			accessibilityLabel: 'Search',
			icon: 'magnify',
		},
	]);

	const renderScene = React.useCallback(
		({ route }: SceneRendererProps & { route: SceneRoute }) => {
			switch (route.key) {
				case 'home':
					return <Home stackId={componentId} />;
				case 'search':
					return <Search stackId={componentId} />;
				case 'questions':
					return <Questions stackId={componentId} />;
				default:
					return null;
			}
		},
		[componentId],
	);

	React.useEffect(() => {
		const listener: NavigationComponentListener = {
			navigationButtonPressed: (event: NavigationButtonPressedEvent) => {
				if (event.buttonId === 'DASHBOARD_MENU') {
					Navigation.mergeOptions(componentId, {
						sideMenu: { left: { visible: true } },
					});
				}
			},
		};

		const subscription = Navigation.events().registerComponentListener(listener, componentId);
		return () => {
			subscription.remove();
		};
	}, [componentId]);

	return (
		<TabView
			style={styles.root}
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
