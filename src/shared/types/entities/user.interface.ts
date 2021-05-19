import { FetchEntity } from '../fetchFields.interface';
import { IProfile } from './profile.interface';

export interface IUser {
	id: string;
	email: string;
	profiles: IProfile[]; // FIXME
}

export type UserEntity = FetchEntity<'user', IUser>;
