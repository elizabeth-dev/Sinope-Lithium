export const LoginAction = 'auth/Login';

export interface ILoginAction {
	type: typeof LoginAction;
	payload: {
		username: string;
		password: string;
	};
}

export const LoginSuccessAction = 'auth/LoginSuccess';

export interface ILoginSuccessAction {
	type: typeof LoginSuccessAction;
	payload: {
		token: string;
	};
}

export const LoginFailureAction = 'auth/LoginFailure';

export interface ILoginFailureAction {
	type: typeof LoginFailureAction;
}

export const LogoutAction = 'auth/Logout';

export interface ILogoutAction {
	type: typeof LogoutAction;
}

export type AuthActions = ILoginAction | ILoginSuccessAction | ILoginFailureAction | ILogoutAction;
