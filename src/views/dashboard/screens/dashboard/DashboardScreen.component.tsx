import React from 'react';
import { Dimensions } from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { Navigation, NavigationButtonPressedEvent, NavigationComponentProps } from 'react-native-navigation';
import { NavigationComponentListener } from 'react-native-navigation/lib/dist/interfaces/NavigationComponentListener';
import { Colors } from 'react-native-paper';
import { NavigationState, Route, SceneRendererProps, TabBar, TabView } from 'react-native-tab-view';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Home } from '../../components/home/Home.component';
import { Notifications } from '../../components/notifications/Notifications.component';

import { DashboardScreenStyles as styles } from './DashboardScreen.styles';

type SceneRoute = Route & { icon: string };

const initialLayout = { width: Dimensions.get('window').width };

// TODO: Check color prop capabilities
const renderIcon = ({ route, focused }: { route: SceneRoute, focused: boolean, color: string }) =>
	<MaterialIcon name={ route.icon } size={ 26 } color={ focused ? Colors.purple400 : undefined } />;

const renderTabBar = (sceneProps: SceneRendererProps & { navigationState: NavigationState<SceneRoute> }) =>
	<TabBar { ...sceneProps } style={ styles.tabBar } renderIcon={ renderIcon } />;

export const DashboardScreen: React.FC<NavigationComponentProps> = ({ componentId }) => {
	const [ index, setIndex ] = React.useState(0);

	const [ routes ] = React.useState<SceneRoute[]>([
		{ key: 'home', accessibilityLabel: 'Home', icon: 'home' },
		{ key: 'notifications', accessibilityLabel: 'Notifications', icon: 'bell' },
	]);

	const renderScene = ({ route }: SceneRendererProps & { route: SceneRoute }) => {
		switch (route.key) {
			case 'home':
				return <Home stackId={ componentId } />;
			case 'notifications':
				return <Notifications />;
			default:
				return null;
		}
	};

	React.useEffect(() => {
		const listener: NavigationComponentListener = {
			navigationButtonPressed: (event: NavigationButtonPressedEvent) => {
				if (event.buttonId === 'DASHBOARD_MENU') {
					Navigation.mergeOptions(
						componentId,
						{ sideMenu: { left: { visible: true } } },
					);
				}
			},
		};

		const subscription = Navigation.events().registerComponentListener(listener, componentId);
		return () => {
			subscription.remove();
		};
	}, [ componentId ]);

	return (
		<TabView
			navigationState={ { index, routes } }
			renderScene={ renderScene }
			onIndexChange={ setIndex }
			initialLayout={ initialLayout }
			renderTabBar={ renderTabBar }
		/>
	);
};

DashboardScreen.displayName = 'app.sinope.lithium.dashboard.DashboardScreen';
Navigation.registerComponent(DashboardScreen.displayName, () => gestureHandlerRootHOC(DashboardScreen));