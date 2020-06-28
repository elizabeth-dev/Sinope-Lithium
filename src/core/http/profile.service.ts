import { developmentEnv } from '@core/environments/development.env';
import {
	CreateProfileDto,
	IProfile,
	UpdateProfileDto,
} from '@shared/types/entities/profile.interface';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map } from 'rxjs/operators';
import { IPost } from '@shared/types/entities/post.interface';

const getById = (id: string, token: string): Observable<IProfile> => {
	return ajax.getJSON(`${developmentEnv.apiUrl}/profile/${id}`, {
		Authorization: `Bearer ${token}`,
	});
};

const create = (
	newProfile: CreateProfileDto,
	token: string,
): Observable<IProfile> => {
	return ajax
		.post(`${developmentEnv.apiUrl}/profile`, newProfile, {
			Authorization: `Bearer ${token}`,
		})
		.pipe(map((res) => res.response as IProfile));
};

const remove = (id: string, token: string): Observable<void> => {
	return ajax
		.delete(`${developmentEnv.apiUrl}/profile/${id}`, {
			Authorization: `Bearer ${token}`,
		})
		.pipe(map(() => {}));
};

const update = (
	id: string,
	updateBody: UpdateProfileDto,
	token: string,
): Observable<IProfile> => {
	return ajax
		.put(`${developmentEnv.apiUrl}/profile/${id}`, updateBody, {
			Authorization: `Bearer ${token}`,
		})
		.pipe(map((res) => res.response as IProfile));
};

const addManager = (
	id: string,
	newManager: string,
	token: string,
): Observable<void> => {
	return ajax
		.put(
			`${developmentEnv.apiUrl}/profile/${id}/managers/${newManager}`,
			undefined,
			{ Authorization: `Bearer, ${token}` },
		)
		.pipe(map(() => {}));
};

const removeManager = (
	id: string,
	manager: string,
	token: string,
): Observable<void> => {
	return ajax
		.delete(`${developmentEnv.apiUrl}/profile/${id}/managers/${manager}`, {
			Authorization: `Bearer, ${token}`,
		})
		.pipe(map(() => {}));
};

const getFollowers = (id: string, token: string): Observable<IProfile[]> => {
	return ajax.getJSON(`${developmentEnv.apiUrl}/profile/${id}/followers`, {
		Authorization: `Bearer ${token}`,
	});
};

const getFollowing = (id: string, token: string): Observable<IProfile[]> => {
	return ajax.getJSON(`${developmentEnv.apiUrl}/profile/${id}/following`, {
		Authorization: `Bearer ${token}`,
	});
};

const follow = (
	id: string,
	fromProfile: string,
	token: string,
): Observable<void> => {
	return ajax
		.put(
			`${developmentEnv.apiUrl}/profile/${id}/followers/${fromProfile}`,
			undefined,
			{ Authorization: `Bearer ${token}` },
		)
		.pipe(map(() => {}));
};

const unfollow = (
	id: string,
	fromProfile: string,
	token: string,
): Observable<void> => {
	return ajax
		.delete(
			`${developmentEnv.apiUrl}/profile/${id}/followers/${fromProfile}`,
			{ Authorization: `Bearer ${token}` },
		)
		.pipe(map(() => {}));
};

const timeline = (profile: string, token: string): Observable<IPost[]> => {
	return ajax.getJSON(
		`${developmentEnv.apiUrl}/profile/${profile}/timeline`,
		{
			Authorizatoin: `Bearer ${token}`,
		},
	);
};

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
