import {createAction, props} from '@ngrx/store';

interface LoginSuccessProps {
	token: string;
}

export const loginSuccessAction = createAction('[Auth] Login success',
	props<LoginSuccessProps>());
