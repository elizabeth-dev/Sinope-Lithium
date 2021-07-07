import { developmentEnv } from '@core/environments/development.env';
import { map, Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { UserRes } from '../model/api';

const getSelf = (token: string): Observable<UserRes> => {
	return ajax.getJSON(`${developmentEnv.apiUrl}/users/self?expand=profiles`, {
		Authorization: `Bearer ${token}`,
	});
};

const getById = (id: string, token: string): Observable<UserRes> => {
	return ajax.getJSON(
		`${developmentEnv.apiUrl}/users/${id}?expand=profiles&expand=profiles.following&expand=profiles.followers`,
		{
			Authorization: `Bearer ${token}`,
		},
	);
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
