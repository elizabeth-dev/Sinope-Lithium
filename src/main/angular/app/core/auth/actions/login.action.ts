import {createAction, props} from '@ngrx/store';

interface LoginPayload {
	email: string;
	password: string;
}

export const loginAction = createAction('[Auth] Login', props<LoginPayload>());
