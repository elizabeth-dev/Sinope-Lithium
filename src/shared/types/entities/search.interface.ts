import { FetchEntity } from '../fetchFields.interface';

export interface ISearch {
	profiles: string[];
	posts: string[];
}

export type SearchEntity = FetchEntity<'search', ISearch>;
