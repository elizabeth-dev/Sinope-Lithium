import { FetchEntity } from '../fetchFields.interface';
import { IProfile } from '@shared/types/entities/profile.interface';

export interface IUser {
	id: string;
	name: string;
	email: string;
	profiles: IProfile[];
}

export interface CreateUserDto {
	name: string;
	email: string;
	password: string;
}

export interface UpdateUserDto {
	name?: string;
}

export type UserEntity = FetchEntity<'user', IUser>;
