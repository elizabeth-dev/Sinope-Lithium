import { developmentEnv } from '@core/environments/development.env';
import { IProfile } from '@shared/types/entities/profile.interface';
import { IUser, UpdateUserDto } from '@shared/types/entities/user.interface';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map } from 'rxjs/operators';

const getSelf = (
	token: string,
): Observable<Omit<IUser, 'profiles'> & { profiles: IProfile[] }> => {
	return ajax.getJSON(`${developmentEnv.apiUrl}/users/`, {
		Authorization: `Bearer ${token}`,
	});
};

const getById = (id: string, token: string): Observable<IUser> => {
	return ajax.getJSON(`${developmentEnv.apiUrl}/users/${id}`, {
		Authorization: `Bearer ${token}`,
	});
};

const update = (
	id: string,
	updateBody: UpdateUserDto,
	token: string,
): Observable<IUser> => {
	return ajax
		.put(`${developmentEnv.apiUrl}/users/${id}`, updateBody, {
			Authorization: `Bearer ${token}`,
		})
		.pipe(map((res) => res.response as IUser));
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
	update,
};
