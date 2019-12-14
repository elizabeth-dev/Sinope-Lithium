import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { AuthService } from '@src/app/core/auth/auth.service';

import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';

import * as AuthActions from './actions/';

@Injectable()
export class AuthEffects {
	public login$ = createEffect(() =>
		this.action$.pipe(
			ofType(AuthActions.login),
			exhaustMap((action) =>
				this.authService.login(action.email, action.password).pipe(
					map((res) =>
						AuthActions.loginSuccess({ token: res.token })
					),
					catchError((error) => of(AuthActions.loginFailure(error)))
				)
			)
		)
	);

	constructor(
		private readonly action$: Actions,
		private readonly authService: AuthService
	) {}
}
