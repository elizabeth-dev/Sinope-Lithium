import { AppState } from '@core/state/app.store';
import { fromPost } from '@core/state/selectors/post.selectors';
import { fromProfile } from '@core/state/selectors/profile.selectors';
import { PostList } from '@shared/components/post-list/PostList.component';
import { Post } from '@shared/components/post/Post.component';
import { useAppDispatch } from '@shared/hooks/use-shallow-selector/useAppDispatch.hook';
import React from 'react';
import { Animated, View } from 'react-native';
import { NavigationFunctionComponent } from 'react-native-navigation';
import { useSelector } from 'react-redux';
import { PostScreenStyles as styles } from './PostScreen.styles';
import { ProgressBar } from '@shared/components/progress-bar/ProgressBar.component';
import { PostActions } from '@actions/post.actions';

export interface PostScreenProps {
	postId: string;
}

export const PostScreen: NavigationFunctionComponent<PostScreenProps> = ({ postId, componentId }) => {
	const dispatcher = useAppDispatch();
	const selectPostById = React.useMemo(() => fromPost.make.byId(), []);

	const [headerHeight, setHeaderHeight] = React.useState(0);
	const post = useSelector((state: AppState) => selectPostById(state, postId));
	const currentProfile = useSelector(fromProfile.currentId);

	React.useEffect(() => {
		dispatcher(PostActions.request({ post: postId }));
	}, [postId, dispatcher]);

	const scroll = React.useRef(new Animated.Value(0)).current;
	const mainPostY = scroll.interpolate({
		inputRange: [0, headerHeight],
		outputRange: [0, headerHeight * -1],
		extrapolateRight: 'clamp',
	});

	return (
		<>
			{post.isFetching && <ProgressBar backgroundColor="#4a0072" style={styles.progress} />}
			<View style={styles.root}>
				{headerHeight !== 0 && (
					<PostList
						currentProfile={currentProfile}
						posts={[]}
						stackId={componentId}
						onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scroll } } }], {
							useNativeDriver: true,
						})}
						containerPaddingTop={headerHeight}
						progressViewOffset={headerHeight}
						refreshing={post.isFetching}
					/>
				)}
				<Post
					post={post.post}
					currentProfile={currentProfile}
					mainPostY={mainPostY as unknown as number}
					onLayout={({ nativeEvent }) => setHeaderHeight(nativeEvent.layout.height)}
					stackId={componentId}
				/>
			</View>
		</>
	);
};
