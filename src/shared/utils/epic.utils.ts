import { AuthActions, ITokenExpiredAction } from '@actions/auth.actions';
import { AppActionsDto } from '@core/state/actions/app.actions';
import { catchError, Observable, of, throwError } from 'rxjs';
import { AjaxError } from 'rxjs/ajax';

export const errorHandler = <T>(action: AppActionsDto) =>
	catchError<T, Observable<ITokenExpiredAction>>((err: AjaxError) => {
		if (err.status === 401) return of(AuthActions.expired({ action }));

		return throwError(() => err); // FIXME: Never should return error to the epic
	});
