import { developmentEnv } from '@core/environments/development.env';
import { Observable, throwError } from 'rxjs';
import { ajax, AjaxError } from 'rxjs/ajax';
import { catchError, map } from 'rxjs/operators';
import { CreateUserReq, TokenPairRes } from '../model/api';

const login = (email: string, password: string): Observable<TokenPairRes> => {
	return ajax
		.post(
			`${developmentEnv.apiUrl}/auth/login`,
			{
				email,
				password,
			},
			{ 'Content-Type': 'application/json' },
		)
		.pipe(
			map((res) => res.response as TokenPairRes),
			catchError((err: AjaxError) => {
				console.error(JSON.stringify(err));

				return throwError(err.status);
			}),
		);
};

const register = (newUser: CreateUserReq): Observable<TokenPairRes> => {
	return ajax.post(`${developmentEnv.apiUrl}/auth/register`, newUser).pipe(
		map((res) => res.response as TokenPairRes),
		catchError((err: AjaxError) => {
			console.error(JSON.stringify(err));

			return throwError(err.status);
		}),
	);
};

const refresh = (refreshToken: string): Observable<TokenPairRes> => {
	return ajax
		.post(`${developmentEnv.apiUrl}/auth/refreshToken`, { refreshToken })
		.pipe(map((res) => res.response as TokenPairRes));
};

const logout = (refreshToken: string): Observable<void> => {
	return ajax.post(`${developmentEnv.apiUrl}/auth/logout`, { refreshToken }).pipe(
		map(() => {
			return;
		}),
	);
};

export const AuthService = {
	login,
	register,
	refresh,
	logout,
};
