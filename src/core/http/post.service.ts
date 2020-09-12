import { developmentEnv } from '@core/environments/development.env';
import { CreatePostDto, IPost } from '@shared/types/entities/post.interface';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map } from 'rxjs/operators';

const getById = (id: string, token: string): Observable<IPost> => {
	return ajax.getJSON(`${developmentEnv.apiUrl}/posts/${id}`, {
		Authorization: `Bearer ${token}`,
	});
};

const getByProfile = (profile: string, token: string): Observable<IPost[]> => {
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

const create = (newPost: CreatePostDto, token: string): Observable<IPost> => {
	return ajax
		.post(`${developmentEnv.apiUrl}/posts`, newPost, {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		})
		.pipe(map((res) => res.response as IPost));
};

const getLikes = (id: string, token: string) => {
	return ajax.getJSON(`${developmentEnv.apiUrl}/posts/${id}/likes`, {
		Authorization: `Bearer ${token}`,
	});
};

const like = (id: string, fromProfile: string, token: string) => {
	return ajax
		.put(
			`${developmentEnv.apiUrl}/posts/${id}/likes/${fromProfile}`,
			undefined,
			{
				Authorization: `Bearer ${token}`,
			},
		)
		.pipe(map((res) => res.response as IPost));
};

const unlike = (id: string, fromProfile: string, token: string) => {
	return ajax
		.delete(`${developmentEnv.apiUrl}/posts/${id}/likes/${fromProfile}`, {
			Authorization: `Bearer ${token}`,
		})
		.pipe(map((res) => res.response as IPost));
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
