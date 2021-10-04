import { developmentEnv } from '@core/environments/development.env';
import { fetchAPI } from '@shared/utils/fetch.utils';
import { CreateUserReq, TokenPairRes } from '../model/api';

const login = (email: string, password: string): Promise<TokenPairRes> =>
	fetchAPI(`${developmentEnv.apiUrl}/auth/login`, undefined, { email, password });

const register = (newUser: CreateUserReq): Promise<TokenPairRes> =>
	fetchAPI(`${developmentEnv.apiUrl}/auth/register`, undefined, newUser);

const refresh = (refreshToken: string): Promise<TokenPairRes> =>
	fetchAPI(`${developmentEnv.apiUrl}/auth/refreshToken`, undefined, { refreshToken });

const logout = (refreshToken: string): Promise<void> =>
	fetchAPI(`${developmentEnv.apiUrl}/auth/logout`, undefined, { refreshToken }).then(() => {});

export const AuthSrv = {
	login,
	register,
	refresh,
	logout,
};
