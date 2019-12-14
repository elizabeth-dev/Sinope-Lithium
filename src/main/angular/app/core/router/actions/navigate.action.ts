import { createAction, props } from '@ngrx/store';
import { NavigationExtras, Params } from '@angular/router';

interface NavigatePayload {
	path: any[];
	query?: Params;
	extras?: NavigationExtras;
}

export const navigateAction = createAction(
	'[Router] Navigate',
	props<NavigatePayload>()
);
