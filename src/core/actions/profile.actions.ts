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

export const SwitchProfileAction = 'profile/SwitchProfileAction';

export interface ISwitchProfileAction {
	type: typeof SwitchProfileAction;
	payload: {
		profileId: string;
	};
}

const switchProfileFn = (profileId: string): ISwitchProfileAction => ({
	type: SwitchProfileAction,
	payload: { profileId },
});

export type ProfileActionsDto = IRequestProfileAction | IReceiveProfilesAction | ISwitchProfileAction;

export const ProfileActions = { switch: switchProfileFn };
