import { developmentEnv } from '@core/environments/development.env';
import { TokenPair } from '@shared/types/auth.interface';
import { from, Observable, throwError } from 'rxjs';
import { ajax, AjaxError } from 'rxjs/ajax';
import { map, mergeMap, catchError } from 'rxjs/operators';

const login = (email: string, password: string): Observable<TokenPair> => {
	/* return from(
		fetch(`${developmentEnv.apiUrl}/auth/login`, {
			body: JSON.stringify({ email, password }),
			method: 'POST',
			headers: new Headers({
				'Content-Type': 'application/json',
				Accept: 'application/json',
			}),
		}),
	).pipe(
		mergeMap((res) => res.json() as Promise<TokenPair>),
		catchError((err) => {
			console.log(JSON.stringify(err));

			return throwError(err);
		}),
	); */
	return ajax
		.post(
			`${developmentEnv.apiUrl}/auth/login`,
			{ email, password },
			{ 'Content-Type': 'application/json' },
		)
		.pipe(
			map((res) => res.response as TokenPair),
			catchError((err: AjaxError) => {
				console.log(JSON.stringify(err));

				return throwError(err);
			}),
		);
};

const refresh = (refreshToken: string): Observable<TokenPair> => {
	return ajax
		.post(`${developmentEnv.apiUrl}/auth/refreshToken`, { refreshToken })
		.pipe(map((res) => res.response as TokenPair));
};

const logout = (refreshToken: string): Observable<void> => {
	return ajax
		.post(`${developmentEnv.apiUrl}/auth/logout`, { refreshToken })
		.pipe(
			map(() => {
				return;
			}),
		);
};

export const AuthService = {
	login,
	refresh,
	logout,
};
