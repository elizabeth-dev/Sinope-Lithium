import { Injectable } from '@angular/core';

import { createEffect, Actions, ofType } from '@ngrx/effects';

import * as RouterActions from './actions/';
import { Router } from '@angular/router';
import { exhaustMap } from 'rxjs/operators';

@Injectable()
export class RouterEffects {
	public navigate$ = createEffect(
		() =>
			this.action$.pipe(
				ofType(RouterActions.navigate),
				exhaustMap((action) =>
					this.router.navigate(action.path, {
						queryParams: action.query,
						...action.extras,
					})
				)
			),
		{ dispatch: false }
	);

	constructor(
		private readonly action$: Actions,
		private readonly router: Router
	) {}
}
