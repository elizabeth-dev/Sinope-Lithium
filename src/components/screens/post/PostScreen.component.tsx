import { ProgressBar } from '@atoms/progress-bar/ProgressBar.component';
import { PostList } from '@molecules/post-list/PostList.component';
import { Post } from '@molecules/post/Post.component';
import { FullPost } from '@shared/types/entities/post.interface';
import React from 'react';
import { Animated, View } from 'react-native';
import { PostScreenStyles as styles } from './PostScreen.styles';

export interface PostScreenProps {
	isFetching: boolean;
	currentProfileId: string;
	post: FullPost;
	onPostNav: (postId: string) => void;
	onProfileNav: (profileId: string) => void;
	onReplyNav: (postId: string) => void;
	onLike: (postId: string) => void;
	onUnlike: (postId: string) => void;
}

export const PostScreen: React.FC<PostScreenProps> = ({
	isFetching,
	currentProfileId,
	post,
	onLike,
	onPostNav,
	onProfileNav,
	onReplyNav,
	onUnlike,
}) => {
	const [headerHeight, setHeaderHeight] = React.useState(0);

	const scroll = React.useRef(new Animated.Value(0)).current;
	const mainPostY = scroll.interpolate({
		inputRange: [0, headerHeight],
		outputRange: [0, headerHeight * -1],
		extrapolateRight: 'clamp',
	});

	return (
		<>
			{isFetching && <ProgressBar backgroundColor="#4a0072" style={styles.progress} />}
			<View style={styles.root}>
				{headerHeight !== 0 && (
					<PostList
						currentProfile={currentProfileId}
						posts={[]}
						onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scroll } } }], {
							useNativeDriver: true,
						})}
						containerPaddingTop={headerHeight}
						progressViewOffset={headerHeight}
						refreshing={isFetching}
						onPostNav={onPostNav}
						onProfileNav={onProfileNav}
						onReplyNav={onReplyNav}
						onLike={onLike}
						onUnlike={onUnlike}
					/>
				)}
				<Post
					post={post}
					currentProfileId={currentProfileId}
					mainPostY={mainPostY as unknown as number}
					onLayout={({ nativeEvent }) => setHeaderHeight(nativeEvent.layout.height)}
					onProfileNav={onProfileNav}
					onReplyNav={onReplyNav}
					onLike={onLike}
					onUnlike={onUnlike}
				/>
			</View>
		</>
	);
};
