import { FetchEntity } from '../fetchFields.interface';
import { IProfile } from './profile.interface';
import { FullPost } from './post.interface';

export interface ISearch {
	profiles: string[];
	posts: string[];
}

export interface ISearchResult {
	profiles: IProfile[];
	posts: FullPost[];
}

export type SearchEntity = FetchEntity<'search', ISearch>;
