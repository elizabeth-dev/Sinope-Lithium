import { Icon } from '@shared/components/icon/Icon.component';
import { SceneRoute } from '@shared/types/scene-route.type';
import React from 'react';
import { Dimensions } from 'react-native';
import { Navigation, NavigationButtonPressedEvent, NavigationFunctionComponent } from 'react-native-navigation';
import { NavigationComponentListener } from 'react-native-navigation/lib/dist/interfaces/NavigationComponentListener';
import { NavigationState, SceneRendererProps, TabBar, TabView } from 'react-native-tab-view';
import { Home } from '../../components/home/Home.component';
import { Questions } from '../../components/questions/Questions.component';
import { Search } from '../../components/search/Search.component';
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
