import { PostActions } from '@actions/post.actions';
import { ProfileActions } from '@actions/profile.actions';
import { AppState } from '@core/state/app.store';
import { fromPost } from '@core/state/selectors/post.selectors';
import { fromProfile } from '@core/state/selectors/profile.selectors';
import { ProfileScreen } from '@screens/profile/ProfileScreen.component';
import { nav } from '@shared/helper/navigation.helper';
import { useAppDispatch } from '@shared/hooks/useAppDispatch.hook';
import { useCallback, useEffect, useMemo } from 'react';
import {
	Navigation,
	NavigationButtonPressedEvent,
	NavigationComponentListener,
	NavigationFunctionComponent,
} from 'react-native-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';

export interface ProfileViewProps {
	profileId: string;
}

export const ProfileView: NavigationFunctionComponent<ProfileViewProps> = ({ componentId, profileId }) => {
	const dispatcher = useAppDispatch();

	const selectPostsByProfile = useMemo(() => fromPost.make.byProfile(), []);

	const currentProfileId = useSelector(fromProfile.currentId);
	const profileEntity = useSelector((state: AppState) => fromProfile.byId(state, profileId));
	const postsEntity = useSelector((state: AppState) => selectPostsByProfile(state, profileId));

	const isFetching = (profileEntity?.isFetching ?? true) || (postsEntity?.isFetching ?? true);
	const posts = postsEntity?.posts?.map((postEntity) => postEntity.post) ?? [];

	const onProfileNav = (_profileId: string) => nav.toProfile(_profileId, componentId);
	const onPostNav = (postId: string) => nav.toPost(postId, componentId);
	const onReplyNav = (postId: string) => nav.toReply(postId, componentId);
	const onAskQuestionNav = () => nav.toAskQuestion(profileId, componentId);
	const onFollowingNav = () => nav.toFollowing(profileEntity.profile.following?.profiles, componentId);
	const onFollowersNav = () => nav.toFollowers(profileEntity.profile.followers?.profiles, componentId);

	const onLike = (postId: string) => dispatcher(PostActions.like({ post: postId, fromProfile: currentProfileId }));

	const onUnlike = (postId: string) =>
		dispatcher(PostActions.unlike({ post: postId, fromProfile: currentProfileId }));

	const onRefresh = useCallback(() => {
		dispatcher(ProfileActions.request({ profile: profileId, fromProfile: currentProfileId }));
		dispatcher(PostActions.requestFromProfile({ profile: profileId }));
	}, [dispatcher, profileId, currentProfileId]);

	useEffect(() => onRefresh(), [onRefresh]);

	useEffect(() => {
		const listener: NavigationComponentListener = {
			navigationButtonPressed: (event: NavigationButtonPressedEvent) => {
				if (event.buttonId === 'FOLLOW_PROFILE') {
					dispatcher(ProfileActions.follow({ fromProfile: currentProfileId, toProfile: profileId }));
				} else if (event.buttonId === 'UNFOLLOW_PROFILE') {
					dispatcher(ProfileActions.unfollow({ fromProfile: currentProfileId, toProfile: profileId }));
				}
			},
		};

		const subscription = Navigation.events().registerComponentListener(listener, componentId);
		return () => {
			subscription.remove();
		};
	}, [componentId, currentProfileId, dispatcher, profileId]);

	useEffect(() => {
		if (profileId !== currentProfileId) {
			if (!profileEntity.profile.followingThem) {
				MaterialIcons.getImageSource('person-add', 25).then((followIcon) =>
					Navigation.mergeOptions(componentId, {
						topBar: {
							rightButtons: [
								{
									id: 'FOLLOW_PROFILE',
									icon: followIcon,
									text: 'Follow',
								},
							],
						},
					}),
				);
			} else {
				MaterialIcons.getImageSource('person-remove', 25).then((followIcon) =>
					Navigation.mergeOptions(componentId, {
						topBar: {
							rightButtons: [
								{
									id: 'UNFOLLOW_PROFILE',
									icon: followIcon,
									text: 'Unfollow',
								},
							],
						},
					}),
				);
			}
		}
	}, [profileEntity.profile.followingThem, currentProfileId, profileId, componentId]);

	return (
		<ProfileScreen
			currentProfileId={currentProfileId}
			posts={posts}
			onRefresh={onRefresh}
			isFetching={isFetching}
			onPostNav={onPostNav}
			onProfileNav={onProfileNav}
			onReplyNav={onReplyNav}
			onLike={onLike}
			onUnlike={onUnlike}
			onAskQuestionNav={onAskQuestionNav}
			profile={profileEntity?.profile}
			onFollowersNav={onFollowersNav}
			onFollowingNav={onFollowingNav}
		/>
	);
};
