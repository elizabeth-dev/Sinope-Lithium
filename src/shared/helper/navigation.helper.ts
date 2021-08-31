import { askQuestionScreenLayer } from '@shared/navigation/layers/ask-question-screen.layer';
import { composeScreenLayer } from '@shared/navigation/layers/compose-screen.layer';
import { postScreenLayer } from '@shared/navigation/layers/post-screen.layer';
import { profileListScreenLayer } from '@shared/navigation/layers/profile-list-screen.layer';
import { profileScreenLayer } from '@shared/navigation/layers/profile-screen.layer';
import { Navigation } from 'react-native-navigation';

// TODO Remove "centerStack" id or get that summed up
const onProfileNav = (profileId: string, componentId: string) =>
	Navigation.push(componentId, profileScreenLayer(profileId));

const onPostNav = (postId: string, componentId: string) => Navigation.push(componentId, postScreenLayer(postId));

const onReplyNav = (postId: string, componentId: string) => Navigation.push(componentId, composeScreenLayer(postId));

const onComposeNav = (componentId: string) => Navigation.push(componentId, composeScreenLayer());

const onFollowingNav = (profileIds: string[], componentId: string) =>
	Navigation.push(componentId, profileListScreenLayer(profileIds, 'Following'));

const onFollowersNav = (profileIds: string[], componentId: string) =>
	Navigation.push(componentId, profileListScreenLayer(profileIds, 'Followers'));

const onAskQuestionNav = (profileId: string, componentId: string) =>
	Navigation.push(componentId, askQuestionScreenLayer(profileId));

export const nav = {
	toProfile: onProfileNav,
	toPost: onPostNav,
	toReply: onReplyNav,
	toCompose: onComposeNav,
	toFollowing: onFollowingNav,
	toFollowers: onFollowersNav,
	toAskQuestion: onAskQuestionNav,
};
