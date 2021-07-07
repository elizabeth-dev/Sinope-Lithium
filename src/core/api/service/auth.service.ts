import { developmentEnv } from '@core/environments/development.env';
import { map, Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
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
		.pipe(map((res) => res.response as TokenPairRes));
};

const register = (newUser: CreateUserReq): Observable<TokenPairRes> => {
	return ajax
		.post(`${developmentEnv.apiUrl}/auth/register`, newUser)
		.pipe(map((res) => res.response as TokenPairRes));
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
