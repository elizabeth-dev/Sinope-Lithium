import { developmentEnv } from '@core/environments/development.env';
import { TokenPair } from '@shared/types/auth.interface';
import { Observable, throwError } from 'rxjs';
import { ajax, AjaxError } from 'rxjs/ajax';
import { catchError, map } from 'rxjs/operators';
import { CreateUserDto } from '@shared/types/entities/user.interface';

const login = (email: string, password: string): Observable<TokenPair> => {
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
			map((res) => res.response as TokenPair),
			catchError((err: AjaxError) => {
				console.error(JSON.stringify(err));

				return throwError(err.status);
			}),
		);
};

const register = (newUser: CreateUserDto): Observable<TokenPair> => {
	return ajax.post(`${developmentEnv.apiUrl}/auth/register`, newUser).pipe(
		map((res) => res.response as TokenPair),
		catchError((err: AjaxError) => {
			console.error(JSON.stringify(err));

			return throwError(err.status);
		}),
	);
};

const refresh = (refreshToken: string): Observable<TokenPair> => {
	return ajax
		.post(`${developmentEnv.apiUrl}/auth/refreshToken`, { refreshToken })
		.pipe(map((res) => res.response as TokenPair));
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
