import React from 'react';
import { Dimensions } from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { Navigation, NavigationButtonPressedEvent, NavigationComponentProps } from 'react-native-navigation';
import { NavigationComponentListener } from 'react-native-navigation/lib/dist/interfaces/NavigationComponentListener';
import { NavigationState, Route, SceneMap, SceneRendererProps, TabBar, TabView } from 'react-native-tab-view';
import { Scene } from 'react-native-tab-view/lib/typescript/src/types';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Home } from '../../components/home/Home.component';
import { Notifications } from '../../components/notifications/Notifications.component';
import { DashboardScreenStyles as styles } from './DashboardScreen.styles';

const initialLayout = { width: Dimensions.get('window').width };

const renderIcon = (iconProps: Scene<Route & { icon: string }> & {
	focused: boolean;
	color: string;
}) => <MaterialIcon name={ iconProps.route.icon } size={ 26 } />;

const renderTabBar = (sceneProps: SceneRendererProps & { navigationState: NavigationState<Route & { icon: string }> }) =>
	<TabBar { ...sceneProps } style={ styles.tabBar } renderIcon={ renderIcon } />;

export const DashboardScreen: React.FC = (props: NavigationComponentProps) => {
	const [ index, setIndex ] = React.useState(1);

	const [ routes ] = React.useState<(Route & { icon: string })[]>([
		{ key: 'home', accessibilityLabel: 'Home', icon: 'home' },
		{ key: 'notifications', accessibilityLabel: 'Notifications', icon: 'bell' },
	]);

	// TODO: https://github.com/react-native-community/react-native-tab-view#avoid-unnecessary-re-renders
	const renderScene = SceneMap({
		home: Home,
		notifications: Notifications,
	});

	React.useEffect(() => {
		const listener: NavigationComponentListener = {
			navigationButtonPressed: (event: NavigationButtonPressedEvent) => {
				if (event.buttonId === 'DASHBOARD_MENU') {
					Navigation.mergeOptions(
						props.componentId,
						{ sideMenu: { left: { visible: true } } },
					);
				}
			},
		};

		const subscription = Navigation.events().registerComponentListener(listener, props.componentId);
		return () => {
			subscription.remove();
		};
	}, []);

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
