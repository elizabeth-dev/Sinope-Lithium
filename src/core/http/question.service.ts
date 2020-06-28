import {
	CreateQuestionDto,
	IQuestion,
} from '@shared/types/entities/question.interface';
import { ajax } from 'rxjs/ajax';
import { developmentEnv } from '@core/environments/development.env';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

const create = (
	newQuestion: CreateQuestionDto,
	profile: string,
	token: string,
): Observable<IQuestion> => {
	return ajax
		.post(
			`${developmentEnv.apiUrl}/profile/${profile}/questions`,
			newQuestion,
			{
				Authorization: `Bearer ${token}`,
			},
		)
		.pipe(map((res) => res.response as IQuestion));
};

const getByProfile = (
	profile: string,
	token: string,
): Observable<IQuestion[]> => {
	return ajax.getJSON(
		`${developmentEnv.apiUrl}/profile/${profile}/questions`,
		{ Authorization: `Bearer ${token}` },
	);
};

export const QuestionService = {
	getByProfile,
	create,
};
