import { Icon } from '@atoms/icon/Icon.component';
import { Home } from '@molecules/home/Home.component';
import { Questions } from '@molecules/questions/Questions.component';
import { Search } from '@molecules/search/Search.component';
import { FullPost } from '@shared/types/entities/post.interface';
import { FullQuestion } from '@shared/types/entities/question.interface';
import { SceneRoute } from '@shared/types/scene-route.type';
import React from 'react';
import { Dimensions } from 'react-native';
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

export interface DashboardScreenProps {
	currentProfileId: string;
	timeline: FullPost[];
	timelineFetching: boolean;
	questions: FullQuestion[];
	fetchingQuestions: boolean;
	searchHistory: string[];
	componentId: string;
	onQuestionsRefresh: (profileId: string) => void;
	onQuestionAnswer: (questionId: string) => void;
	onTimelineRefresh: (profileId: string) => void;
	onComposeNav: (componentId: string) => void;
	onPostNav: (postId: string, componentId: string) => void;
	onProfileNav: (profileId: string, componentId: string) => void;
	onReplyNav: (postId: string, componentId: string) => void;
	onLike: (postId: string, profileId: string) => void;
	onUnlike: (postId: string, profileId: string) => void;
	onSearch: (searchTerm: string) => void;
	onRemoveSearch: (searchTerm: string) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
	currentProfileId,
	timeline,
	timelineFetching,
	questions,
	fetchingQuestions,
	searchHistory,
	componentId,
	onTimelineRefresh,
	onComposeNav,
	onPostNav,
	onProfileNav,
	onReplyNav,
	onLike,
	onUnlike,
	onQuestionsRefresh,
	onQuestionAnswer,
	onSearch,
	onRemoveSearch,
}) => {
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
					return (
						<Home
							currentProfileId={currentProfileId}
							timeline={timeline}
							onTimelineRefresh={onTimelineRefresh}
							timelineFetching={timelineFetching}
							componentId={componentId}
							onPostNav={onPostNav}
							onProfileNav={onProfileNav}
							onReplyNav={onReplyNav}
							onLike={onLike}
							onUnlike={onUnlike}
							onComposeNav={onComposeNav}
						/>
					);
				case 'search':
					return <Search onSearch={onSearch} onRemoveSearch={onRemoveSearch} searchHistory={searchHistory} />;
				case 'questions':
					return (
						<Questions
							questions={questions}
							fetchingQuestions={fetchingQuestions}
							onQuestionsRefresh={onQuestionsRefresh}
							onProfileNav={onProfileNav}
							onQuestionAnswer={onQuestionAnswer}
							currentProfileId={currentProfileId}
							componentId={componentId}
						/>
					);
				default:
					return null;
			}
		},
		[
			currentProfileId,
			timeline,
			timelineFetching,
			questions,
			fetchingQuestions,
			searchHistory,
			componentId,
			onTimelineRefresh,
			onPostNav,
			onProfileNav,
			onReplyNav,
			onLike,
			onUnlike,
			onQuestionsRefresh,
			onQuestionAnswer,
			onSearch,
			onRemoveSearch,
			onComposeNav,
		],
	);

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
