import { developmentEnv } from '@core/environments/development.env';
import { expandUri, fetchAPI } from '@shared/utils/fetch.utils';
import { CreateProfileReq, PostRes, ProfileRes, UpdateProfileReq } from '../model/api';

const getById = (id: string, fromProfile: string, token: string): Promise<ProfileRes> =>
	fetchAPI(
		`${developmentEnv.apiUrl}/profiles/${id}?profile=${fromProfile}&${expandUri('following', 'followers')}`,
		token,
	);

const create = (newProfile: CreateProfileReq, token: string): Promise<ProfileRes> =>
	fetchAPI(`${developmentEnv.apiUrl}/profiles?${expandUri('following', 'followers')}`, token, newProfile);

const remove = (id: string, token: string): Promise<void> =>
	fetchAPI(`${developmentEnv.apiUrl}/profiles/${id}`, token, undefined, 'DELETE');

const update = (id: string, body: UpdateProfileReq, token: string): Promise<ProfileRes> =>
	fetchAPI(`${developmentEnv.apiUrl}/profiles/${id}?${expandUri('following', 'followers')}`, token, body, 'PATCH');

const addManager = (id: string, newManager: string, token: string): Promise<void> =>
	fetchAPI(`${developmentEnv.apiUrl}/profiles/${id}/managers/${newManager}`, token, undefined, 'PUT');

const removeManager = (id: string, manager: string, token: string): Promise<void> =>
	fetchAPI(`${developmentEnv.apiUrl}/profiles/${id}/managers/${manager}`, token, undefined, 'DELETE');

const getFollowers = (id: string, token: string): Promise<ProfileRes[]> =>
	fetchAPI(`${developmentEnv.apiUrl}/profiles/${id}/followers?${expandUri('following', 'followers')}`, token);

const getFollowing = (id: string, token: string): Promise<ProfileRes[]> =>
	fetchAPI(`${developmentEnv.apiUrl}/profiles/${id}/following?${expandUri('following', 'followers')}`, token);

const follow = (id: string, fromProfile: string, token: string): Promise<void> =>
	fetchAPI(`${developmentEnv.apiUrl}/profiles/${id}/followers/${fromProfile}`, token, undefined, 'PUT');

const unfollow = (id: string, fromProfile: string, token: string): Promise<void> =>
	fetchAPI(`${developmentEnv.apiUrl}/profiles/${id}/followers/${fromProfile}`, token, undefined, 'DELETE');

const timeline = (profile: string, token: string): Promise<PostRes[]> =>
	fetchAPI(
		`${developmentEnv.apiUrl}/profiles/${profile}/timeline?${expandUri(
			'profile',
			'profile.following',
			'profile.followers',
			'question',
			'question.from',
		)}`,
		token,
	);

export const ProfileService = {
	getById,
	update,
	remove,
	create,
	addManager,
	removeManager,
	getFollowers,
	getFollowing,
	follow,
	unfollow,
	timeline,
};
