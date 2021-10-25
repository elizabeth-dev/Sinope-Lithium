import { FetchEntity } from '../fetchFields.interface';
import { IProfile } from './profile.interface';

export interface IUser {
	id: string;
	email: string;
	profiles: IProfile[]; // FIXME: API returns IProfile, state saves string, error in selfProfile reducer when string
}

export type UserEntity = FetchEntity<'user', IUser>;
