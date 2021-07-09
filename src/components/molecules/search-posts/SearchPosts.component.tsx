import React from 'react';
import { useSelector } from 'react-redux';
import { fromPost } from '@core/state/selectors/post.selectors';
import { AppState } from '@core/state/app.store';
import { fromProfile } from '@core/state/selectors/profile.selectors';
import { PostList } from '@shared/components/post-list/PostList.component';

export interface SearchPostsProps {
	stackId: string;
	postIds: string[];
}

export const SearchPosts: React.FC<SearchPostsProps> = ({
	stackId,
	postIds,
}) => {
	const selectPostById = React.useMemo(() => fromPost.make.byId(), []);
	const posts = useSelector((state: AppState) => postIds.map(id => selectPostById(state,
		id,
	).post));
	const currentProfile = useSelector(fromProfile.currentId);

	return (<PostList currentProfile={currentProfile} posts={posts} stackId={stackId} />);
};
