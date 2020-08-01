import { FetchEntity } from '../fetchFields.interface';

export interface IUser {
	id: string;
	name: string;
	email: string;
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
