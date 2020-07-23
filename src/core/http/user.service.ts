import { Observable } from 'rxjs';
import {
	IUser,
	CreateUserDto,
	UpdateUserDto,
} from '@shared/types/entities/user.interface';
import { ajax } from 'rxjs/ajax';
import { developmentEnv } from '@core/environments/development.env';
import { map } from 'rxjs/operators';
import { IProfile } from '@shared/types/entities/profile.interface';

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

const create = (newUser: CreateUserDto): Observable<IUser> => {
	return ajax
		.post(`${developmentEnv.apiUrl}/users`, newUser)
		.pipe(map((res) => res.response as IUser));
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
	create,
	remove,
	update,
};
