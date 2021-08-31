import { PostActions } from '@actions/post.actions';
import { AppState } from '@core/state/app.store';
import { fromPost } from '@core/state/selectors/post.selectors';
import { fromProfile } from '@core/state/selectors/profile.selectors';
import { fromSearch } from '@core/state/selectors/search.selectors';
import { SearchScreen } from '@screens/search/SearchScreen.component';
import { nav } from '@shared/helper/navigation.helper';
import { useAppDispatch } from '@shared/hooks/use-shallow-selector/useAppDispatch.hook';
import React from 'react';
import { NavigationFunctionComponent } from 'react-native-navigation';
import { useSelector } from 'react-redux';

export interface SearchViewProps {
	searchTerm: string;
}

export const SearchView: NavigationFunctionComponent<SearchViewProps> = ({ searchTerm, componentId }) => {
	const dispatcher = useAppDispatch();

	const selectPostById = React.useMemo(() => fromPost.make.byId(), []);

	const currentProfileId = useSelector(fromProfile.currentId);
	const { search } = useSelector((state: AppState) => fromSearch.result(state, searchTerm));
	const posts = useSelector((state: AppState) => search.posts.map((id) => selectPostById(state, id).post));
	const profiles = useSelector((state: AppState) => search.profiles.map((id) => fromProfile.byId(state, id).profile));

	const onProfileNav = (profileId: string) => nav.toProfile(profileId, componentId);
	const onPostNav = (postId: string) => nav.toPost(postId, componentId);
	const onReplyNav = (postId: string) => nav.toReply(postId, componentId);

	const onLike = (postId: string) => dispatcher(PostActions.like({ post: postId, fromProfile: currentProfileId }));

	const onUnlike = (postId: string) =>
		dispatcher(PostActions.unlike({ post: postId, fromProfile: currentProfileId }));

	return (
		<SearchScreen
			currentProfileId={currentProfileId}
			posts={posts}
			profiles={profiles}
			onPostNav={onPostNav}
			onProfileNav={onProfileNav}
			onReplyNav={onReplyNav}
			onLike={onLike}
			onUnlike={onUnlike}
		/>
	);
};
