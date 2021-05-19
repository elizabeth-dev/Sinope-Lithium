import { UserRes } from '@core/api/model/api';
import { IUser } from '@shared/types/entities/user.interface';
import { profileResToIProfile } from './profile.mapper';

export const userResToIUser = (userRes: UserRes, receivedAt: number): IUser => ({
	id: userRes.id,
	email: userRes.email,
	profiles: userRes.profiles.map((profile) => profileResToIProfile(profile, receivedAt)),
});
