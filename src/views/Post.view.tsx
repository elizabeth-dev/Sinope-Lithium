import { PostActions } from '@actions/post.actions';
import { AppState } from '@core/state/app.store';
import { fromPost } from '@core/state/selectors/post.selectors';
import { fromProfile } from '@core/state/selectors/profile.selectors';
import { PostScreen } from '@screens/post/PostScreen.component';
import { nav } from '@shared/helper/navigation.helper';
import { useAppDispatch } from '@shared/hooks/use-shallow-selector/useAppDispatch.hook';
import { useEffect, useMemo } from 'react';
import { NavigationFunctionComponent } from 'react-native-navigation';
import { useSelector } from 'react-redux';

export interface PostViewProps {
	postId: string;
}

export const PostView: NavigationFunctionComponent<PostViewProps> = ({ postId, componentId }) => {
	const dispatcher = useAppDispatch();
	const selectPostById = useMemo(() => fromPost.make.byId(), []);

	const postEntity = useSelector((state: AppState) => selectPostById(state, postId));
	const currentProfileId = useSelector(fromProfile.currentId);

	// TODO: Dedupe all Navs and likes/unlikes, maybe?
	const onProfileNav = (profileId: string) => nav.toProfile(profileId, componentId);
	const onPostNav = (_postId: string) => nav.toPost(_postId, componentId);
	const onReplyNav = (_postId: string) => nav.toReply(_postId, componentId);

	const onLike = (_postId: string) => dispatcher(PostActions.like({ post: _postId, fromProfile: currentProfileId }));

	const onUnlike = (_postId: string) =>
		dispatcher(PostActions.unlike({ post: _postId, fromProfile: currentProfileId }));

	useEffect(() => {
		dispatcher(PostActions.request({ post: postId }));
	}, [postId, dispatcher]);

	return (
		<PostScreen
			isFetching={postEntity.isFetching}
			post={postEntity.post}
			currentProfileId={currentProfileId}
			onProfileNav={onProfileNav}
			onPostNav={onPostNav}
			onReplyNav={onReplyNav}
			onLike={onLike}
			onUnlike={onUnlike}
		/>
	);
};
