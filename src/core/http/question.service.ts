import { developmentEnv } from '@core/environments/development.env';
import {
	CreateQuestionDto,
	IQuestion,
} from '@shared/types/entities/question.interface';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map } from 'rxjs/operators';

const create = (
	newQuestion: CreateQuestionDto,
	token: string,
): Observable<IQuestion> => {
	return ajax
		.post(`${developmentEnv.apiUrl}/questions`, newQuestion, {
			Authorization: `Bearer ${token}`,
		})
		.pipe(map((res) => res.response as IQuestion));
};

const getByProfile = (token: string): Observable<IQuestion[]> => {
	return ajax.getJSON(`${developmentEnv.apiUrl}/questions`, {
		Authorization: `Bearer ${token}`,
	});
};

export const QuestionService = {
	getByProfile,
	create,
};
