import { developmentEnv } from '@core/environments/development.env';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map } from 'rxjs/operators';
import { UserRes } from '../model/api';

const getSelf = (token: string): Observable<UserRes> => {
	return ajax.getJSON(`${developmentEnv.apiUrl}/users/`, {
		Authorization: `Bearer ${token}`,
	});
};

const getById = (id: string, token: string): Observable<UserRes> => {
	return ajax.getJSON(`${developmentEnv.apiUrl}/users/${id}`, {
		Authorization: `Bearer ${token}`,
	});
};

const remove = (id: string, token: string): Observable<void> => {
	return ajax
		.delete(`${developmentEnv.apiUrl}/users/${id}`, {
			Authorization: `Bearer ${token}`,
		})
		.pipe(map(() => {}));
};

export const UserService = {
	getSelf,
	getById,
	remove,
};
