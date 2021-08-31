import { PostList } from '@molecules/post-list/PostList.component';
import { FullPost } from '@shared/types/entities/post.interface';
import React from 'react';

export interface SearchPostsProps {
	currentProfileId: string;
	posts: FullPost[];
	onPostNav: (postId: string) => void;
	onProfileNav: (profileId: string) => void;
	onReplyNav: (postId: string) => void;
	onLike: (postId: string) => void;
	onUnlike: (postId: string) => void;
}

export const SearchPosts: React.FC<SearchPostsProps> = ({
	posts,
	currentProfileId,
	onLike,
	onPostNav,
	onProfileNav,
	onReplyNav,
	onUnlike,
}) => (
	<PostList
		currentProfile={currentProfileId}
		posts={posts}
		onPostNav={onPostNav}
		onProfileNav={onProfileNav}
		onReplyNav={onReplyNav}
		onLike={onLike}
		onUnlike={onUnlike}
	/>
);
