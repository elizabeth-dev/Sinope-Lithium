import { developmentEnv } from '@core/environments/development.env';
import { map, Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { CreateProfileReq, PostRes, ProfileRes, UpdateProfileReq } from '../model/api';

const getById = (id: string, fromProfile: string, token: string): Observable<ProfileRes> => {
	return ajax.getJSON(
		`${developmentEnv.apiUrl}/profiles/${id}?profile=${fromProfile}?expand=followers&expand=following`,
		{
			Authorization: `Bearer ${token}`,
		},
	);
};

const create = (newProfile: CreateProfileReq, token: string): Observable<ProfileRes> => {
	return ajax
		.post(`${developmentEnv.apiUrl}/profiles?expand=following&expand=followers`, newProfile, {
			Authorization: `Bearer ${token}`,
		})
		.pipe(map((res) => res.response as ProfileRes));
};

const remove = (id: string, token: string): Observable<void> => {
	return ajax
		.delete(`${developmentEnv.apiUrl}/profiles/${id}`, {
			Authorization: `Bearer ${token}`,
		})
		.pipe(map(() => {}));
};

const update = (id: string, updateBody: UpdateProfileReq, token: string): Observable<ProfileRes> => {
	return ajax
		.patch(`${developmentEnv.apiUrl}/profiles/${id}?expand=following&expand=followers`, updateBody, {
			Authorization: `Bearer ${token}`,
		})
		.pipe(map((res) => res.response as ProfileRes));
};

const addManager = (id: string, newManager: string, token: string): Observable<void> => {
	return ajax
		.put(`${developmentEnv.apiUrl}/profiles/${id}/managers/${newManager}`, undefined, {
			Authorization: `Bearer, ${token}`,
		})
		.pipe(map(() => {}));
};

const removeManager = (id: string, manager: string, token: string): Observable<void> => {
	return ajax
		.delete(`${developmentEnv.apiUrl}/profiles/${id}/managers/${manager}`, {
			Authorization: `Bearer, ${token}`,
		})
		.pipe(map(() => {}));
};

const getFollowers = (id: string, token: string): Observable<ProfileRes[]> => {
	return ajax.getJSON(`${developmentEnv.apiUrl}/profiles/${id}/followers?expand=following&expand=followers`, {
		Authorization: `Bearer ${token}`,
	});
};

const getFollowing = (id: string, token: string): Observable<ProfileRes[]> => {
	return ajax.getJSON(`${developmentEnv.apiUrl}/profiles/${id}/following?expand=following&expand=followers`, {
		Authorization: `Bearer ${token}`,
	});
};

const follow = (id: string, fromProfile: string, token: string): Observable<void> => {
	return ajax
		.put(`${developmentEnv.apiUrl}/profiles/${id}/followers/${fromProfile}`, undefined, {
			Authorization: `Bearer ${token}`,
		})
		.pipe(map(() => {}));
};

const unfollow = (id: string, fromProfile: string, token: string): Observable<void> => {
	return ajax
		.delete(`${developmentEnv.apiUrl}/profiles/${id}/followers/${fromProfile}`, {
			Authorization: `Bearer ${token}`,
		})
		.pipe(map(() => {}));
};

const timeline = (profile: string, token: string): Observable<PostRes[]> => {
	return ajax.getJSON(
		`${developmentEnv.apiUrl}/profiles/${profile}/timeline?expand=profile&expand=question&expand=profile.following&expand=profile.followers&expand=question.from`,
		{
			Authorization: `Bearer ${token}`,
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
