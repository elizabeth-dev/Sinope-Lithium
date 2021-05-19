import { developmentEnv } from '@core/environments/development.env';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map } from 'rxjs/operators';
import { CreatePostReq, PostRes, ProfileRes } from '../model/api';

const getById = (id: string, token: string): Observable<PostRes> => {
	return ajax.getJSON(
		`${developmentEnv.apiUrl}/posts/${id}?expand=profile&expand=question&expand=profile.following&expand=profile.followers&expand=question.from`,
		{
			Authorization: `Bearer ${token}`,
		},
	);
};

const getByProfile = (profile: string, token: string): Observable<PostRes[]> => {
	return ajax.getJSON(
		`${developmentEnv.apiUrl}/posts?profile=${profile}&expand=profile&expand=question&expand=profile.following&expand=profile.followers&expand=question.from`,
		{
			Authorization: `Bearer ${token}`,
		},
	);
};

const remove = (id: string, token: string): Observable<void> => {
	return ajax
		.delete(`${developmentEnv.apiUrl}/posts/${id}`, {
			Authorization: `Bearer ${token}`,
		})
		.pipe(map(() => {}));
};

const create = (newPost: CreatePostReq, token: string): Observable<PostRes> => {
	return ajax
		.post(
			`${developmentEnv.apiUrl}/posts?expand=profile&expand=question&expand=profile.following&expand=profile.followers&expand=question.from`,
			newPost,
			{
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		)
		.pipe(map((res) => res.response as PostRes));
};

const getLikes = (id: string, token: string): Observable<ProfileRes[]> => {
	return ajax.getJSON(`${developmentEnv.apiUrl}/posts/${id}/likes?expand=following&expand=followers`, {
		Authorization: `Bearer ${token}`,
	});
};

const like = (id: string, fromProfile: string, token: string): Observable<PostRes> => {
	return ajax
		.put(
			`${developmentEnv.apiUrl}/posts/${id}/likes/${fromProfile}?expand=profile&expand=question&expand=profile.following&expand=profile.followers&expand=question.from`,
			undefined,
			{
				Authorization: `Bearer ${token}`,
			},
		)
		.pipe(map((res) => res.response as PostRes));
};

const unlike = (id: string, fromProfile: string, token: string): Observable<PostRes> => {
	return ajax
		.delete(
			`${developmentEnv.apiUrl}/posts/${id}/likes/${fromProfile}?expand=profile&expand=question&expand=profile.following&expand=profile.followers&expand=question.from`,
			{
				Authorization: `Bearer ${token}`,
			},
		)
		.pipe(map((res) => res.response as PostRes));
};

export const PostService = {
	getById,
	getByProfile,
	create,
	remove,
	like,
	unlike,
	getLikes,
};
