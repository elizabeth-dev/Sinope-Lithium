import { composeScreenLayer } from '@shared/navigation/layers/compose-screen.layer';
import { postScreenLayer } from '@shared/navigation/layers/post-screen.layer';
import { profileScreenLayer } from '@shared/navigation/layers/profile-screen.layer';
import { Navigation } from 'react-native-navigation';

// TODO Remove centerStack
const onProfileNav = (profileId: string, componentId: string) =>
	Navigation.push(componentId, profileScreenLayer(profileId));

const onPostNav = (postId: string, componentId: string) => Navigation.push(componentId, postScreenLayer(postId));

const onReplyNav = (postId: string, componentId: string) => Navigation.push(componentId, composeScreenLayer(postId));

const onComposeNav = (componentId: string) => Navigation.push(componentId, composeScreenLayer());

export const nav = {
	toProfile: onProfileNav,
	toPost: onPostNav,
	toReply: onReplyNav,
	toCompose: onComposeNav,
};
