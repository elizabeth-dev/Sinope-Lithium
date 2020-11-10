import { Observable, throwError } from 'rxjs';
import { ajax, AjaxError } from 'rxjs/ajax';
import { developmentEnv } from '../environments/development.env';
import { catchError, map } from 'rxjs/operators';
import { ISearchResult } from '@shared/types/entities/search.entity';

const search = (searchTerm: string, token: string): Observable<ISearchResult> => {
	return ajax.get(`${developmentEnv.apiUrl}/search/${searchTerm}`, {
			Authorization: `Bearer ${token}`,
		})
		.pipe(map((res) => res.response as ISearchResult), catchError((err: AjaxError) => {
			console.error(JSON.stringify(err));

			return throwError(err.status);
		}));
};

export const SearchService = { search };
