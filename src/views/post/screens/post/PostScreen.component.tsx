import { PostActions } from '@core/actions/post.actions';
import { AppState } from '@core/app.store';
import { PostList } from '@shared/components/post-list/PostList.component';
import { Post } from '@shared/components/post/Post.component';
import { useAppDispatch } from '@shared/hooks/use-shallow-selector/useAppDispatch.hook';
import React from 'react';
import { Animated, View } from 'react-native';
import { NavigationFunctionComponent } from 'react-native-navigation';
import { useSelector } from 'react-redux';
import { PostScreenStyles as styles } from './PostScreen.styles';

export interface PostScreenProps {
	postId: string;
}

export const PostScreen: NavigationFunctionComponent<PostScreenProps> = ({
	postId,
	componentId,
}) => {
	const dispatcher = useAppDispatch();

	const [headerHeight, setHeaderHeight] = React.useState(0);
	const post = useSelector((state: AppState) => state.post.postsById[postId]);
	const currentProfile = useSelector(
		(state: AppState) => state.profile.self.current,
	);

	React.useEffect(() => {
		dispatcher(PostActions.request(postId));
	}, [postId, dispatcher]);

	const scroll = React.useRef(new Animated.Value(0)).current;
	const mainPostY = scroll.interpolate({
		inputRange: [0, headerHeight],
		outputRange: [0, headerHeight * -1],
		extrapolateRight: 'clamp',
	});

	return (
		<View style={styles.root}>
			{headerHeight !== 0 && (
				<PostList
					currentProfile={currentProfile}
					posts={[]}
					stackId={componentId}
					onScroll={Animated.event(
						[{ nativeEvent: { contentOffset: { y: scroll } } }],
						{
							useNativeDriver: true,
						},
					)}
					containerPaddingTop={headerHeight}
					progressViewOffset={headerHeight}
					refreshing={post.isFetching}
				/>
			)}
			<Post
				post={post.post}
				currentProfile={currentProfile}
				mainPostY={(mainPostY as unknown) as number}
				onLayout={({ nativeEvent }) =>
					setHeaderHeight(nativeEvent.layout.height)
				}
				stackId={componentId}
			/>
		</View>
	);
};
