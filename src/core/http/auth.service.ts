import { developmentEnv } from '@core/environments/development.env';
import { TokenPair } from '@shared/types/auth.interface';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map } from 'rxjs/operators';

const login = (email: string, password: string): Observable<TokenPair> => {
	return ajax
		.post(`${developmentEnv.apiUrl}/auth/login`, { email, password })
		.pipe(map((res) => res.response as TokenPair));
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
	refresh,
	logout,
};
