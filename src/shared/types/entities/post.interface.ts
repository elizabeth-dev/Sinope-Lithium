import { FetchEntity } from '../fetchFields.interface';
import { IProfile } from './profile.interface';
import { FullQuestion } from './question.interface';

export interface IPost {
	id: string;
	content: string;
	date: Date;
	profile: string;
	likes: string[];
	question?: string;
}

export interface INewPost {
	content: string;
	question?: string;
	profile: string;
	tmpId: string;
}

export interface CreatePostDto {
	profile: string;
	content: string;
	question?: string;
}

export type PostEntity = FetchEntity<'post', IPost>;

export type FullPost = Omit<Omit<IPost, 'profile'>, 'question'> & { profile: IProfile, question?: FullQuestion };

export type FullPostEntity = FetchEntity<'post', FullPost>;
