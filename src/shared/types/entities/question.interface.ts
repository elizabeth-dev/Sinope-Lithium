import { FetchEntity } from '../fetchFields.interface';
import { IProfile } from './profile.interface';

export interface IQuestion {
	id: string;
	content: string;
	anonymous: boolean;
	from?: string;
	recipient: string;
	answer?: string;
	date: Date;
}

export interface CreateQuestionDto {
	content: string;
	anonymous: boolean;
	from: string;
	recipient: string;
}

export interface INewQuestion {
	content: string;
	anonymous: boolean;
	from: string;
	recipient: string;
	tmpId: string;
}

export type QuestionEntity = FetchEntity<'question', IQuestion>;

export type FullQuestion = Omit<IQuestion, 'from'> & { from?: IProfile };

export type FullQuestionEntity = FetchEntity<'question', FullQuestion>;

