import { createAction, props } from '@ngrx/store';

export const forwardAction = createAction(
	'[Router] Forward',
	props()
);
