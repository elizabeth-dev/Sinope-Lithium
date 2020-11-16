import { CreateProfileDto, IProfile } from '@shared/types/entities/profile.interface';

export const RequestProfileAction = 'profile/RequestProfileAction';

export interface IRequestProfileAction {
	type: typeof RequestProfileAction;
	payload: {
		profile: string; fromProfile: string;
	};
}

const requestProfileFn = (profile: string, fromProfile: string): IRequestProfileAction => ({
	type: RequestProfileAction,
	payload: {
		profile,
		fromProfile,
	},
});

export const ReceiveProfilesAction = 'profile/ReceiveProfilesAction';

export interface IReceiveProfilesAction {
	type: typeof ReceiveProfilesAction;
	payload: {
		profiles: IProfile[]; receivedAt: number;
	};
}

const receiveProfileFn = (profiles: IProfile[], receivedAt: number): IReceiveProfilesAction => ({
	type: ReceiveProfilesAction,
	payload: {
		profiles,
		receivedAt,
	},
});

export const CreateProfileAction = 'profile/CreateProfileAction';

export interface ICreateProfileAction {
	type: typeof CreateProfileAction;
	payload: {
		newProfile: CreateProfileDto;
	};
}

const createProfileFn = (newProfile: CreateProfileDto): ICreateProfileAction => ({
	type: CreateProfileAction,
	payload: { newProfile },
});

export const CreatedProfileAction = 'profile/CreatedProfileAction';

export interface ICreatedProfileAction {
	type: typeof CreatedProfileAction;
	payload: {
		profile: IProfile; receivedAt: number;
	};
}

const createdProfileFn = (profile: IProfile, receivedAt: number): ICreatedProfileAction => ({
	type: CreatedProfileAction,
	payload: {
		profile,
		receivedAt,
	},
});

export const FailedCreateProfileAction = 'profile/FailedCreateProfileAction';

export interface IFailedCreateProfileAction {
	type: typeof FailedCreateProfileAction;
}

const failedCreateProfileFn = (): IFailedCreateProfileAction => ({
	type: FailedCreateProfileAction,
});

export const CreateFirstProfileAction = 'profile/CreateFirstProfileAction';

export interface ICreateFirstProfileAction {
	type: typeof CreateFirstProfileAction;
	payload: {
		newProfile: CreateProfileDto;
	};
}

const createFirstProfileFn = (newProfile: CreateProfileDto): ICreateFirstProfileAction => ({
	type: CreateFirstProfileAction,
	payload: { newProfile },
});

export const CreatedFirstProfileAction = 'profile/CreatedFirstProfileAction';

export interface ICreatedFirstProfileAction {
	type: typeof CreatedFirstProfileAction;
	payload: {
		profile: IProfile; receivedAt: number;
	};
}

const createdFirstProfileFn = (profile: IProfile,
	receivedAt: number): ICreatedFirstProfileAction => ({
	type: CreatedFirstProfileAction,
	payload: {
		profile,
		receivedAt,
	},
});

export const FailedCreateFirstProfileAction = 'profile/FailedCreateFirstProfileAction';

export interface IFailedCreateFirstProfileAction {
	type: typeof FailedCreateFirstProfileAction;
}

const failedCreateFirstProfileFn = (): IFailedCreateFirstProfileAction => ({
	type: FailedCreateFirstProfileAction,
});

export const FollowProfileAction = 'profile/FollowProfileAction';

export interface IFollowProfileAction {
	type: typeof FollowProfileAction;
	payload: {
		fromProfile: string; toProfile: string;
	};
}

const followProfileFn = (fromProfile: string, toProfile: string): IFollowProfileAction => ({
	type: FollowProfileAction,
	payload: {
		fromProfile,
		toProfile,
	},
});

export const UnfollowProfileAction = 'profile/UnfollowProfileAction';

export interface IUnfollowProfileAction {
	type: typeof UnfollowProfileAction;
	payload: {
		fromProfile: string; toProfile: string;
	};
}

const unfollowProfileFn = (fromProfile: string, toProfile: string): IUnfollowProfileAction => ({
	type: UnfollowProfileAction,
	payload: {
		fromProfile,
		toProfile,
	},
});

export const FollowedProfileAction = 'profile/FollowedProfileAction';

export interface IFollowedProfileAction {
	type: typeof FollowedProfileAction;
	payload: {
		fromProfile: string; toProfile: string;
	};
}

const followedProfileFn = (fromProfile: string, toProfile: string): IFollowedProfileAction => ({
	type: FollowedProfileAction,
	payload: {
		fromProfile,
		toProfile,
	},
});

export const UnfollowedProfileAction = 'profile/UnfollowedProfileAction';

export interface IUnfollowedProfileAction {
	type: typeof UnfollowedProfileAction;
	payload: {
		fromProfile: string; toProfile: string;
	};
}

const unfollowedProfileFn = (fromProfile: string, toProfile: string): IUnfollowedProfileAction => ({
	type: UnfollowedProfileAction,
	payload: {
		fromProfile,
		toProfile,
	},
});

export type ProfileActionsDto =
	| IRequestProfileAction
	| IReceiveProfilesAction
	| ICreateProfileAction
	| ICreatedProfileAction
	| IFailedCreateProfileAction
	| ICreateFirstProfileAction
	| ICreatedFirstProfileAction
	| IFailedCreateFirstProfileAction
	| IFollowProfileAction
	| IUnfollowProfileAction
	| IFollowedProfileAction
	| IUnfollowedProfileAction;

export const ProfileActions = {
	receive: receiveProfileFn,
	request: requestProfileFn,
	create: createProfileFn,
	created: createdProfileFn,
	failedCreate: failedCreateProfileFn,
	createFirst: createFirstProfileFn,
	createdFirst: createdFirstProfileFn,
	failedCreateFirst: failedCreateFirstProfileFn,
	follow: followProfileFn,
	unfollow: unfollowProfileFn,
	followed: followedProfileFn,
	unfollowed: unfollowedProfileFn,
};
