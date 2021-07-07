import { developmentEnv } from '@core/environments/development.env';
import { map, Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { CreateQuestionReq, QuestionRes } from '../model/api';

const send = (newQuestion: CreateQuestionReq, token: string): Observable<QuestionRes> => {
	return ajax
		.post(
			`${developmentEnv.apiUrl}/questions?expand=from&expand=from.following&expand=from.followers`,
			newQuestion,
			{
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		)
		.pipe(map((res) => res.response as QuestionRes));
};

const getByProfile = (profile: string, token: string): Observable<QuestionRes[]> => {
	return ajax.getJSON(
		`${developmentEnv.apiUrl}/questions?profile=${profile}&expand=from&expand=from.following&expand=from.followers`,
		{
			Authorization: `Bearer ${token}`,
		},
	);
};

const remove = (id: string, token: string): Observable<void> => {
	return ajax
		.delete(`${developmentEnv.apiUrl}/questions/${id}`, {
			Authorization: `Bearer ${token}`,
		})
		.pipe(map(() => {}));
};

export const QuestionService = {
	getByProfile,
	send,
	remove,
};
