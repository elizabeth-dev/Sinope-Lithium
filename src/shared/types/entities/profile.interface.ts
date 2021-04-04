import { FetchEntity } from '../fetchFields.interface';

export interface IProfile {
	id: string;
	tag: string;
	name: string;
	created: Date;
	description: string;
	followingMe: boolean;
	followingThem: boolean;
	following: FetchEntity<'profiles', string[]>;
	followers: FetchEntity<'profiles', string[]>;
}

export interface CreateProfileDto {
	tag: string;
	name: string;
	description?: string;
}

export interface UpdateProfileDto {
	tag: string;
	name: string;
	description: string;
}

export type ProfileEntity = FetchEntity<'profile', IProfile>;
