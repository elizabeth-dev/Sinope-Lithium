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

const loginSuccessFn = (accessToken: string, refreshToken: string, expiresAt: number): ILoginSuccessAction => ({
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

const refreshedTokenFn = (accessToken: string, refreshToken: string, expiresAt: number): IRefreshedTokenAction => ({
	type: RefreshedTokenAction,
	payload: { accessToken, refreshToken, expiresAt },
});

export const RegisterAction = 'auth/RegisterAction';

export interface IRegisterAction {
	type: typeof RegisterAction;
	payload: {
		email: string;
		password: string;
	};
}

const registerFn = (email: string, password: string): IRegisterAction => ({
	type: RegisterAction,
	payload: { email, password },
});

export const RegisterSuccessAction = 'auth/RegisterSuccessAction';

export interface IRegisterSuccessAction {
	type: typeof RegisterSuccessAction;
	payload: {
		accessToken: string;
		refreshToken: string;
		expiresAt: number;
	};
}

const registerSuccessFn = (accessToken: string, refreshToken: string, expiresAt: number): IRegisterSuccessAction => ({
	type: RegisterSuccessAction,
	payload: { accessToken, refreshToken, expiresAt },
});

export const RegisterFailureAction = 'auth/RegisterFailureAction';

export interface IRegisterFailureAction {
	type: typeof RegisterFailureAction;
}

const registerFailureFn = (): IRegisterFailureAction => ({
	type: RegisterFailureAction,
});

export type AuthActionsDto =
	| ILoginAction
	| ILoginSuccessAction
	| ILoginFailureAction
	| ILogoutAction
	| IRefreshedTokenAction
	| ITokenExpiredAction
	| IRegisterAction
	| IRegisterSuccessAction
	| IRegisterFailureAction;

export const AuthActions = {
	login: loginFn,
	loginSuccess: loginSuccessFn,
	loginFailure: loginFailureFn,
	logout: logoutFn,
	expired: tokenExpiredFn,
	refreshed: refreshedTokenFn,
	register: registerFn,
	registerSuccess: registerSuccessFn,
	registerFailure: registerFailureFn,
};
