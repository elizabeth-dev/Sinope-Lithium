import { expandUri, fetchAPI } from '@shared/utils/fetch.utils';
import { developmentEnv } from '../../environments/development.env';
import { SearchRes } from '../model/api';

const search = (searchTerm: string, token: string): Promise<SearchRes> =>
	fetchAPI(
		`${developmentEnv.apiUrl}/search/${searchTerm}?${expandUri(
			'profile',
			'profile.following',
			'profile.followers',
			'question',
			'question.from',
			'following',
			'followers',
		)}`,
		token,
	);

export const SearchService = { search };
