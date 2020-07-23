import { IProfile } from '@shared/types/entities/profile.interface';

export const RequestProfileAction = 'profile/RequestProfileAction';

export interface IRequestProfileAction {
	type: typeof RequestProfileAction;
	payload: {
		profile: string;
	};
}

const requestProfileFn = (profile: string): IRequestProfileAction => ({
	type: RequestProfileAction,
	payload: { profile },
});

export const ReceiveProfilesAction = 'profile/ReceiveProfilesAction';

export interface IReceiveProfilesAction {
	type: typeof ReceiveProfilesAction;
	payload: {
		profiles: IProfile[];
		receivedAt: number;
	};
}

const receiveProfileFn = (
	profiles: IProfile[],
	receivedAt: number,
): IReceiveProfilesAction => ({
	type: ReceiveProfilesAction,
	payload: { profiles, receivedAt },
});

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

export type ProfileActionsDto =
	| IRequestProfileAction
	| IReceiveProfilesAction
	| ISwitchProfileAction;

export const ProfileActions = {
	switch: switchProfileFn,
	receive: receiveProfileFn,
	request: requestProfileFn,
};
