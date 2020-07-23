import { AppState } from '@core/app.store';
import { PostList } from '@shared/components/post-list/PostList.component';
import { Post } from '@shared/components/post/Post.component';
import React from 'react';
import { Animated, View } from 'react-native';
import { NavigationComponentProps } from 'react-native-navigation';
import { useSelector } from 'react-redux';
import { PostScreenStyles as styles } from './PostScreen.styles';

export interface PostScreenProps {
	postId: string;
}

export const PostScreen: React.FC<
	PostScreenProps & NavigationComponentProps
> = ({ postId, componentId }) => {
	const [headerHeight, setHeaderHeight] = React.useState(0);
	const post = useSelector(
		(state: AppState) => state.post.postsById[postId].post,
	);

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
				/>
			)}
			<Post
				post={post}
				mainPostY={(mainPostY as unknown) as number}
				onLayout={({ nativeEvent }) =>
					setHeaderHeight(nativeEvent.layout.height)
				}
				stackId={componentId}
			/>
		</View>
	);
};
