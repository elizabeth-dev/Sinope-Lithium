import { ProfileRes } from '@core/api/model/api';
import { FetchEntity } from '../fetchFields.interface';

export interface IUser {
	id: string;
	name: string;
	email: string;
	mprofiles: ProfileRes[]; // FIXME
}

export type UserEntity = FetchEntity<'user', IUser>;
