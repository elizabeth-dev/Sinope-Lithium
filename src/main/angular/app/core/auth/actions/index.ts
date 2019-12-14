import { loginSuccessAction } from './login-success.action';
import { loginFailureAction } from './login-failure.action';
import { loginAction } from './login.action';
import { logoutAction } from './logout.action';

export const loginSuccess = loginSuccessAction;
export const loginFailure = loginFailureAction;
export const login = loginAction;
export const logout = logoutAction;
