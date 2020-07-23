import { IUser } from '@shared/types/entities/user.interface';
import { IProfile } from '@shared/types/entities/profile.interface';

export const RequestSelfUserAction = 'user/RequestSelfUserAction';

export interface IRequestSelfUserAction {
	type: typeof RequestSelfUserAction;
}

const requestSelfUserFn = (): IRequestSelfUserAction => ({
	type: RequestSelfUserAction,
});

export const ReceiveSelfUserAction = 'user/ReceiveSelfUserAction';

export interface IReceiveSelfUserAction {
	type: typeof ReceiveSelfUserAction;
	payload: {
		user: Omit<IUser, 'profiles'> & { profiles: IProfile[] };
		receivedAt: number;
	};
}

const receiveSelfUserFn = (
	user: Omit<IUser, 'profiles'> & { profiles: IProfile[] },
	receivedAt: number,
): IReceiveSelfUserAction => ({
	type: ReceiveSelfUserAction,
	payload: { user, receivedAt },
});

export type UserActionsDto = IReceiveSelfUserAction | IRequestSelfUserAction;

export const UserActions = {
	requestSelf: requestSelfUserFn,
	receiveSelf: receiveSelfUserFn,
};
