import { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { developmentEnv } from '@core/environments/development.env';
import { IPost, CreatePostDto } from '@shared/types/entities/post.interface';
import { map } from 'rxjs/operators';

const getById = (id: string, token: string): Observable<IPost> => {
	return ajax.getJSON(`${developmentEnv.apiUrl}/post/${id}`, {
		Authorization: `Bearer ${token}`,
	});
};

const getByProfile = (profile: string, token: string): Observable<IPost[]> => {
	return ajax.getJSON(`${developmentEnv.apiUrl}/profile/${profile}/posts`, {
		Authorization: `Bearer ${token}`,
	});
};

const remove = (id: string, token: string): Observable<void> => {
	return ajax
		.delete(`${developmentEnv.apiUrl}/post/${id}`, {
			Authorization: `Bearer ${token}`,
		})
		.pipe(map(() => {}));
};

const create = (
	newPost: CreatePostDto,
	profile: string,
	token: string,
): Observable<IPost> => {
	return ajax.post(
		`${developmentEnv.apiUrl}/profile/${profile}/posts`,
		newPost,
		{ Authorization: `Bearer ${token}` },
	).pipe(map((res) => res.response as IPost));
};

const like = (id: string, fromProfile: string, token: string) => {
	return ajax.put(
		`${developmentEnv.apiUrl}/post/${id}/likes/${fromProfile}`,
		{ Authorization: `Bearer ${token}` },
	);
};

const unlike = (id: string, fromProfile: string, token: string) => {
	return ajax.delete(
		`${developmentEnv.apiUrl}/post/${id}/likes/${fromProfile}`,
		{ Authorization: `Bearer ${token}` },
	);
};

export const PostService = { getById, getByProfile, create, remove, like, unlike };
