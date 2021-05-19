import { PostRes, ProfileRes } from '@core/api/model/api';
import { IProfile } from '@shared/types/entities/profile.interface';
import { Require } from '@shared/types/require.type';

export const profileResToIProfile = (profile: ProfileRes, receivedAt: number): IProfile => ({
	id: profile.id,
	tag: profile.tag,
	name: profile.name,
	created: profile.created,
	description: profile.description,
	followers: { profiles: profile.followerIds, isFetching: false, receivedAt },
	following: { profiles: profile.followingIds, isFetching: false, receivedAt },
	followingMe: profile.followingMe ?? false,
	followingThem: profile.followingThem ?? false,
});

export const postResToIProfile = (postRes: Require<PostRes, 'profile'>, receivedAt: number): IProfile =>
	profileResToIProfile(postRes.profile, receivedAt);
