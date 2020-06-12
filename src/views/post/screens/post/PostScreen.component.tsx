import { PostList } from '@shared/components/post-list/PostList.component';
import { Post } from '@shared/components/post/Post.component';
import { IPost } from '@shared/types/entities/post.interface';
import React from 'react';
import { Animated, View } from 'react-native';
import { PostScreenStyles as styles } from './PostScreen.styles';

export interface PostScreenProps {
	post: IPost;
	replies: IPost[];
	stackId: string;
}

export const PostScreen: React.FC<PostScreenProps> = ({ post, replies, stackId }) => {
	const [headerHeight, setHeaderHeight] = React.useState(0);

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
					posts={replies}
					stackId={stackId}
					onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scroll } } }], {
						useNativeDriver: true,
					})}
					containerPaddingTop={headerHeight}
					progressViewOffset={headerHeight}
				/>
			)}
			<Post
				post={post}
				mainPostY={(mainPostY as unknown) as number}
				onLayout={({ nativeEvent }) => setHeaderHeight(nativeEvent.layout.height)}
			/>
		</View>
	);
};
