export const LoginAction = 'auth/LoginAction';

export interface ILoginAction {
	type: typeof LoginAction;
	payload: {
		username: string;
		password: string;
	};
}

const loginFn = (username: string, password: string): ILoginAction => ({
	type: LoginAction,
	payload: { username, password },
});

export const LoginSuccessAction = 'auth/LoginSuccessAction';

export interface ILoginSuccessAction {
	type: typeof LoginSuccessAction;
	payload: {
		accessToken: string;
		refreshToken: string;
		expiresAt: number;
	};
}

const loginSuccessFn = (
	accessToken: string,
	refreshToken: string,
	expiresAt: number,
): ILoginSuccessAction => ({
	type: LoginSuccessAction,
	payload: { accessToken, refreshToken, expiresAt },
});

export const LoginFailureAction = 'auth/LoginFailureAction';

export interface ILoginFailureAction {
	type: typeof LoginFailureAction;
}

const loginFailureFn = (): ILoginFailureAction => ({
	type: LoginFailureAction,
});

export const LogoutAction = 'auth/LogoutAction';

export interface ILogoutAction {
	type: typeof LogoutAction;
	payload: {
		refreshToken: string;
	};
}

const logoutFn = (refreshToken: string): ILogoutAction => ({
	type: LogoutAction,
	payload: { refreshToken },
});

export const TokenExpiredAction = 'auth/TokenExpiredAction';

export interface ITokenExpiredAction {
	type: typeof TokenExpiredAction;
}

const tokenExpiredFn = (): ITokenExpiredAction => ({
	type: TokenExpiredAction,
});

export const RefreshedTokenAction = 'auth/RefreshedTokenAction';

export interface IRefreshedTokenAction {
	type: typeof RefreshedTokenAction;
	payload: {
		accessToken: string;
		refreshToken: string;
		expiresAt: number;
	};
}

const refreshedTokenFn = (
	accessToken: string,
	refreshToken: string,
	expiresAt: number,
): IRefreshedTokenAction => ({
	type: RefreshedTokenAction,
	payload: { accessToken, refreshToken, expiresAt },
});

export type AuthActionsDto =
	| ILoginAction
	| ILoginSuccessAction
	| ILoginFailureAction
	| ILogoutAction
	| IRefreshedTokenAction
	| ITokenExpiredAction;

export const AuthActions = {
	login: loginFn,
	loginSuccess: loginSuccessFn,
	loginFailure: loginFailureFn,
	logout: logoutFn,
	expired: tokenExpiredFn,
	refreshed: refreshedTokenFn,
};
