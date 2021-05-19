import { Observable, throwError } from 'rxjs';
import { ajax, AjaxError } from 'rxjs/ajax';
import { developmentEnv } from '../../environments/development.env';
import { catchError, map } from 'rxjs/operators';
import { SearchRes } from '../model/api';

const search = (searchTerm: string, token: string): Observable<SearchRes> => {
	return ajax
		.get(
			`${developmentEnv.apiUrl}/search/${searchTerm}?expand=profile&expand=question&expand=following&expand=followers&expand=profile.following&expand=profile.followers&expand=question.from`,
			{
				Authorization: `Bearer ${token}`,
			},
		)
		.pipe(
			map((res) => res.response as SearchRes),
			catchError((err: AjaxError) => {
				console.error(JSON.stringify(err));

				return throwError(err.status);
			}),
		);
};

export const SearchService = { search };
