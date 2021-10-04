import { developmentEnv } from '@core/environments/development.env';
import { expandUri, fetchAPI } from '@shared/utils/fetch.utils';
import { UserRes } from '../model/api';

const getSelf = (token: string): Promise<UserRes> =>
	fetchAPI(`${developmentEnv.apiUrl}/users/self?${expandUri('profiles')}`, token);

const getById = (id: string, token: string): Promise<UserRes> =>
	fetchAPI(
		`${developmentEnv.apiUrl}/users/${id}?${expandUri('profiles', 'profiles.following', 'profiles.followers')}`,
		token,
	);

const remove = (id: string, token: string): Promise<void> =>
	fetchAPI(`${developmentEnv.apiUrl}/users/${id}`, token, undefined, 'DELETE');

export const UserService = {
	getSelf,
	getById,
	remove,
};
