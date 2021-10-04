import { developmentEnv } from '@core/environments/development.env';
import { expandUri, fetchAPI } from '@shared/utils/fetch.utils';
import { CreatePostReq, PostRes, ProfileRes } from '../model/api';

const getById = (id: string, token: string): Promise<PostRes> =>
	fetchAPI(
		`${developmentEnv.apiUrl}/posts/${id}?${expandUri(
			'profile',
			'question',
			'profile.following',
			'profile.followers',
			'question.from',
		)}`,
		token,
	);

const getByProfile = (profile: string, token: string): Promise<PostRes[]> =>
	fetchAPI(
		`${developmentEnv.apiUrl}/posts?profile=${profile}&${expandUri(
			'profile',
			'question',
			'profile.following',
			'profile.followers',
			'question.from',
		)}`,
		token,
	);

const remove = (id: string, token: string): Promise<void> =>
	fetchAPI(`${developmentEnv.apiUrl}/posts/${id}`, token, undefined, 'DELETE').then(() => {});

const create = (newPost: CreatePostReq, token: string): Promise<PostRes> =>
	fetchAPI(
		`${developmentEnv.apiUrl}/posts?${expandUri(
			'profile',
			'question',
			'profile.following',
			'profile.followers',
			'question.from',
		)}`,
		token,
		newPost,
	);

const getLikes = (id: string, token: string): Promise<ProfileRes[]> =>
	fetchAPI(`${developmentEnv.apiUrl}/posts/${id}/likes?${expandUri('following', 'followers')}`, token);

const like = (id: string, fromProfile: string, token: string): Promise<PostRes> =>
	fetchAPI(
		`${developmentEnv.apiUrl}/posts/${id}/likes/${fromProfile}?${expandUri(
			'profile',
			'question',
			'profile.following',
			'profile.followers',
			'question.from',
		)}`,
		token,
		undefined,
		'PUT',
	);

const unlike = (id: string, fromProfile: string, token: string): Promise<PostRes> =>
	fetchAPI(
		`${developmentEnv.apiUrl}/posts/${id}/likes/${fromProfile}?${expandUri(
			'profile',
			'question',
			'profile.following',
			'profile.followers',
			'question.from',
		)}`,
		token,
		undefined,
		'DELETE',
	);

export const PostService = {
	getById,
	getByProfile,
	create,
	remove,
	like,
	unlike,
	getLikes,
};
