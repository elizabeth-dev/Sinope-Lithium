import { FetchEntity } from '../fetchFields.interface';

export interface IProfile {
	id: string;
	tag: string;
	name: string;
	created: string;
	description: string;
	followingMe: boolean;
	followingThem: boolean;
	following: FetchEntity<'profiles', string[]>;
	followers: FetchEntity<'profiles', string[]>;
	/* following: string[];
	followers: string[]; */
}

export type ProfileEntity = FetchEntity<'profile', IProfile>;
