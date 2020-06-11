import { IProfile } from '@shared/types/entities/profile.interface';

export const RequestProfileAction = 'post/RequestPostAction';

export interface IRequestProfileAction {
	type: typeof RequestProfileAction;
	payload: {
		profile: string;
	};
}

export const ReceiveProfilesAction = 'profile/ReceiveProfilesAction';

export interface IReceiveProfilesAction {
	type: typeof ReceiveProfilesAction;
	payload: {
		profiles: IProfile[];
		receivedAt: number;
	};
}

export type ProfileActions = IRequestProfileAction | IReceiveProfilesAction;
