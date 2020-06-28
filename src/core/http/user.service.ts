import { Observable } from 'rxjs';
import {
	IUser,
	CreateUserDto,
	UpdateUserDto,
} from '@shared/types/entities/user.interface';
import { ajax } from 'rxjs/ajax';
import { developmentEnv } from '@core/environments/development.env';
import { map } from 'rxjs/operators';

const getById = (id: string, token: string): Observable<IUser> => {
	return ajax.getJSON(`${developmentEnv.apiUrl}/user/${id}`, {
		Authorization: `Bearer ${token}`,
	});
};

const create = (newUser: CreateUserDto): Observable<IUser> => {
	return ajax
		.post(`${developmentEnv.apiUrl}/user`, newUser)
		.pipe(map((res) => res.response as IUser));
};

const update = (
	id: string,
	updateBody: UpdateUserDto,
	token: string,
): Observable<IUser> => {
	return ajax
		.put(`${developmentEnv.apiUrl}/user/${id}`, updateBody, {
			Authorization: `Bearer ${token}`,
		})
		.pipe(map((res) => res.response as IUser));
};

const remove = (id: string, token: string): Observable<void> => {
	return ajax
		.delete(`${developmentEnv.apiUrl}/user/${id}`, {
			Authorization: `Bearer ${token}`,
		})
		.pipe(map(() => {}));
};

export const UserService = {
	getById,
	create,
	remove,
	update,
};
