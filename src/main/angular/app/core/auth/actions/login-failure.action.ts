import {createAction, props} from '@ngrx/store';

interface LoginFailureProps {
	error: string;
	message: string;
}

export const loginFailureAction = createAction('[Auth] Login failure',
	props<LoginFailureProps>());
