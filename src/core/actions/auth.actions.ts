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
		token: string;
	};
}

const loginSuccessFn = (token: string): ILoginSuccessAction => ({
	type: LoginSuccessAction,
	payload: { token },
});

export const LoginFailureAction = 'auth/LoginFailureAction';

export interface ILoginFailureAction {
	type: typeof LoginFailureAction;
}

const loginFailureFn = (): ILoginFailureAction => ({ type: LoginFailureAction });

export const LogoutAction = 'auth/LogoutAction';

export interface ILogoutAction {
	type: typeof LogoutAction;
}

const logoutFn = (): ILogoutAction => ({ type: LogoutAction });

export type AuthActionsDto = ILoginAction | ILoginSuccessAction | ILoginFailureAction | ILogoutAction;

export const AuthActions = {
	login: loginFn,
	loginSuccess: loginSuccessFn,
	loginFailure: loginFailureFn,
	logout: logoutFn,
};
