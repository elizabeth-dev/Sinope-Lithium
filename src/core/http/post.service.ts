import { developmentEnv } from '@core/environments/development.env';
import { CreatePostDto, FullPost } from '@shared/types/entities/post.interface';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map } from 'rxjs/operators';

const getById = (id: string, token: string): Observable<FullPost> => {
	return ajax.getJSON(`${developmentEnv.apiUrl}/posts/${id}`, {
		Authorization: `Bearer ${token}`,
	});
};

const getByProfile = (profile: string, token: string): Observable<FullPost[]> => {
	return ajax.getJSON(`${developmentEnv.apiUrl}/posts?profile=${profile}`, {
		Authorization: `Bearer ${token}`,
	});
};

const remove = (id: string, token: string): Observable<void> => {
	return ajax
		.delete(`${developmentEnv.apiUrl}/posts/${id}`, {
			Authorization: `Bearer ${token}`,
		})
		.pipe(map(() => {
		}));
};

const create = (newPost: CreatePostDto, token: string): Observable<FullPost> => {
	return ajax
		.post(`${developmentEnv.apiUrl}/posts`, newPost, {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		})
		.pipe(map((res) => res.response as FullPost));
};

const getLikes = (id: string, token: string) => {
	return ajax.getJSON(`${developmentEnv.apiUrl}/posts/${id}/likes`, {
		Authorization: `Bearer ${token}`,
	});
};

const like = (id: string, fromProfile: string, token: string) => {
	return ajax
		.put(`${developmentEnv.apiUrl}/posts/${id}/likes/${fromProfile}`, undefined, {
			Authorization: `Bearer ${token}`,
		})
		.pipe(map((res) => res.response as FullPost));
};

const unlike = (id: string, fromProfile: string, token: string) => {
	return ajax
		.delete(`${developmentEnv.apiUrl}/posts/${id}/likes/${fromProfile}`, {
			Authorization: `Bearer ${token}`,
		})
		.pipe(map((res) => res.response as FullPost));
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
