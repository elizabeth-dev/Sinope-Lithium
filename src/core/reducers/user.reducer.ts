import {
	AuthActionsDto,
	LoginAction,
	LoginFailureAction,
	LoginSuccessAction,
	LogoutAction,
} from '@core/actions/auth.actions';
import { IUser } from '@shared/types/entities/user.interface';
import { FetchFields } from '@shared/types/fetchFields.interface';

export interface UserState {
	usersById: { [id: string]: { user: IUser } & FetchFields };
	self: string;
}

const initialState: UserState = {
	usersById: {},
	self: '',
};

export function userReducer(
	state = initialState,
	action: UserActionsDto,
): UserState {
	switch (action.type) {
		case LoginAction:
			return { ...state, loggingIn: true };
		case LoginSuccessAction:
			return {
				...state,
				loggedIn: true,
				accessToken: action.payload.accessToken,
				refreshToken: action.payload.refreshToken,
				expiresAt: action.payload.expiresAt,
				loggingIn: false,
			};
		case LoginFailureAction:
			return { ...state, loggingIn: false };
		case LogoutAction:
			return { ...state, loggedIn: false, accessToken: undefined };
		default:
			return state;
	}
}
