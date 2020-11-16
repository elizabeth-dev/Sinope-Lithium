import { developmentEnv } from '@core/environments/development.env';
import { FullPost } from '@shared/types/entities/post.interface';
import {
	CreateProfileDto, IProfile, UpdateProfileDto,
} from '@shared/types/entities/profile.interface';
import { Observable, throwError } from 'rxjs';
import { ajax, AjaxError } from 'rxjs/ajax';
import { catchError, map } from 'rxjs/operators';

const getById = (id: string, fromProfile: string, token: string): Observable<IProfile> => {
	return ajax.getJSON(`${developmentEnv.apiUrl}/profiles/${id}?profile=${fromProfile}`, {
		Authorization: `Bearer ${token}`,
	});
};

const create = (newProfile: CreateProfileDto, token: string): Observable<IProfile> => {
	return ajax
		.post(`${developmentEnv.apiUrl}/profiles`, newProfile, {
			Authorization: `Bearer ${token}`,
		})
		.pipe(map((res) => res.response as IProfile), catchError((err: AjaxError) => {
			console.error(JSON.stringify(err));

			return throwError(err.status);
		}));
};

const remove = (id: string, token: string): Observable<void> => {
	return ajax
		.delete(`${developmentEnv.apiUrl}/profiles/${id}`, {
			Authorization: `Bearer ${token}`,
		})
		.pipe(map(() => {
		}));
};

const update = (id: string, updateBody: UpdateProfileDto, token: string): Observable<IProfile> => {
	return ajax
		.put(`${developmentEnv.apiUrl}/profiles/${id}`, updateBody, {
			Authorization: `Bearer ${token}`,
		})
		.pipe(map((res) => res.response as IProfile));
};

const addManager = (id: string, newManager: string, token: string): Observable<void> => {
	return ajax
		.put(
			`${developmentEnv.apiUrl}/profiles/${id}/managers/${newManager}`,
			undefined,
			{ Authorization: `Bearer, ${token}` },
		)
		.pipe(map(() => {
		}));
};

const removeManager = (id: string, manager: string, token: string): Observable<void> => {
	return ajax
		.delete(`${developmentEnv.apiUrl}/profiles/${id}/managers/${manager}`, {
			Authorization: `Bearer, ${token}`,
		})
		.pipe(map(() => {
		}));
};

const getFollowers = (id: string, token: string): Observable<IProfile[]> => {
	return ajax.getJSON(`${developmentEnv.apiUrl}/profiles/${id}/followers`, {
		Authorization: `Bearer ${token}`,
	});
};

const getFollowing = (id: string, token: string): Observable<IProfile[]> => {
	return ajax.getJSON(`${developmentEnv.apiUrl}/profiles/${id}/following`, {
		Authorization: `Bearer ${token}`,
	});
};

const follow = (id: string, fromProfile: string, token: string): Observable<void> => {
	return ajax
		.put(
			`${developmentEnv.apiUrl}/profiles/${id}/followers/${fromProfile}`,
			undefined,
			{ Authorization: `Bearer ${token}` },
		)
		.pipe(map(() => {
		}));
};

const unfollow = (id: string, fromProfile: string, token: string): Observable<void> => {
	return ajax
		.delete(
			`${developmentEnv.apiUrl}/profiles/${id}/followers/${fromProfile}`,
			{ Authorization: `Bearer ${token}` },
		)
		.pipe(map(() => {
		}));
};

const timeline = (profile: string, token: string): Observable<FullPost[]> => {
	return ajax.getJSON(`${developmentEnv.apiUrl}/profiles/${profile}/timeline`, {
		Authorization: `Bearer ${token}`,
	});
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
