import { developmentEnv } from '@core/environments/development.env';
import { CreateQuestionDto, FullQuestion, IQuestion } from '@shared/types/entities/question.interface';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map } from 'rxjs/operators';

const send = (
	newQuestion: CreateQuestionDto,
	token: string,
): Observable<IQuestion> => {
	return ajax
		.post(`${developmentEnv.apiUrl}/questions`, newQuestion, {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		})
		.pipe(map((res) => res.response as IQuestion));
};

const getByProfile = (profile: string, token: string): Observable<FullQuestion[]> => {
	return ajax.getJSON(`${developmentEnv.apiUrl}/questions?profile=${profile}`, {
		Authorization: `Bearer ${token}`,
	});
};

const remove = (id: string, token: string): Observable<void> => {
	return ajax
		.delete(`${developmentEnv.apiUrl}/questions/${id}`, {
			Authorization: `Bearer ${token}`,
		})
		.pipe(map(() => {
		}));
};

export const QuestionService = {
	getByProfile,
	send,
	remove,
};
