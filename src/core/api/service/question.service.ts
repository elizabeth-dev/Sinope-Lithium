import { developmentEnv } from '@core/environments/development.env';
import { expandUri, fetchAPI } from '@shared/utils/fetch.utils';
import { CreateQuestionReq, QuestionRes } from '../model/api';

const send = (newQuestion: CreateQuestionReq, token: string): Promise<QuestionRes> =>
	fetchAPI(
		`${developmentEnv.apiUrl}/questions?${expandUri('from', 'from.following', 'from.followers')}`,
		token,
		newQuestion,
	);

const getByProfile = (profile: string, token: string): Promise<QuestionRes[]> =>
	fetchAPI(
		`${developmentEnv.apiUrl}/questions?profile=${profile}&${expandUri(
			'from',
			'from.following',
			'from.followers',
		)}`,
		token,
	);

const remove = (id: string, token: string): Promise<void> =>
	fetchAPI(`${developmentEnv.apiUrl}/questions/${id}`, token, undefined, 'DELETE');

export const QuestionService = {
	getByProfile,
	send,
	remove,
};
