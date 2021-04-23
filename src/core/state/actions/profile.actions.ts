import { ProfileRS } from '@core/api/model/profile.model';
import { CreateProfileDto } from '@shared/types/entities/profile.interface';

export const RequestProfileAction = 'profile/RequestProfileAction';

export interface IRequestProfileAction {
	type: typeof RequestProfileAction;
	payload: {
		profile: string;
		fromProfile: string;
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
		profiles: ProfileRS[];
		receivedAt: number;
	};
}

const receiveProfileFn = (profiles: ProfileRS[], receivedAt: number): IReceiveProfilesAction => ({
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
		profile: ProfileRS;
		receivedAt: number;
	};
}

const createdProfileFn = (profile: ProfileRS, receivedAt: number): ICreatedProfileAction => ({
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
		profile: ProfileRS;
		receivedAt: number;
	};
}

const createdFirstProfileFn = (profile: ProfileRS, receivedAt: number): ICreatedFirstProfileAction => ({
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
		fromProfile: string;
		toProfile: string;
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
		fromProfile: string;
		toProfile: string;
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
		fromProfile: string;
		toProfile: string;
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
		fromProfile: string;
		toProfile: string;
	};
}

const unfollowedProfileFn = (fromProfile: string, toProfile: string): IUnfollowedProfileAction => ({
	type: UnfollowedProfileAction,
	payload: {
		fromProfile,
		toProfile,
	},
});

export const RequestProfileFollowingAction = 'profile/RequestProfileFollowingAction';

export interface IRequestProfileFollowingAction {
	type: typeof RequestProfileFollowingAction;
	payload: {
		profile: string;
	};
}

const requestProfileFollowingFn = (profile: string): IRequestProfileFollowingAction => ({
	type: RequestProfileFollowingAction,
	payload: {
		profile,
	},
});

export const ReceiveProfileFollowingAction = 'profile/ReceiveProfileFollowingAction';

export interface IReceiveProfileFollowingAction {
	type: typeof ReceiveProfileFollowingAction;
	payload: {
		profile: string;
		following: ProfileRS[];
		receivedAt: number;
	};
}

const receiveProfileFollowingFn = (
	profile: string,
	following: ProfileRS[],
	receivedAt: number,
): IReceiveProfileFollowingAction => ({
	type: ReceiveProfileFollowingAction,
	payload: {
		profile,
		following,
		receivedAt,
	},
});

export const RequestProfileFollowersAction = 'profile/RequestProfileFollowersAction';

export interface IRequestProfileFollowersAction {
	type: typeof RequestProfileFollowersAction;
	payload: {
		profile: string;
	};
}

const requestProfileFollowersFn = (profile: string): IRequestProfileFollowersAction => ({
	type: RequestProfileFollowersAction,
	payload: {
		profile,
	},
});

export const ReceiveProfileFollowersAction = 'profile/ReceiveProfileFollowersAction';

export interface IReceiveProfileFollowersAction {
	type: typeof ReceiveProfileFollowersAction;
	payload: {
		profile: string;
		followers: ProfileRS[];
		receivedAt: number;
	};
}

const receiveProfileFollowersFn = (
	profile: string,
	followers: ProfileRS[],
	receivedAt: number,
): IReceiveProfileFollowersAction => ({
	type: ReceiveProfileFollowersAction,
	payload: {
		profile,
		followers,
		receivedAt,
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
	| IUnfollowedProfileAction
	| IRequestProfileFollowersAction
	| IReceiveProfileFollowersAction
	| IRequestProfileFollowingAction
	| IReceiveProfileFollowingAction;

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
	reqFollowers: requestProfileFollowersFn,
	recvFollowers: receiveProfileFollowersFn,
	reqFollowing: requestProfileFollowingFn,
	recvFollowing: receiveProfileFollowingFn,
};
