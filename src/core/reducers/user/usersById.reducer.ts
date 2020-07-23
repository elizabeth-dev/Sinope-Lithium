import {
	ReceiveSelfUserAction,
	UserActionsDto,
} from '@core/actions/user.actions';
import { IUser } from '@shared/types/entities/user.interface';
import { FetchFields } from '@shared/types/fetchFields.interface';

export interface UsersByIdState {
	[id: string]: { user: IUser } & FetchFields;
}

const initialState: UsersByIdState = {};

export function usersByIdReducer(
	state = initialState,
	action: UserActionsDto,
): UsersByIdState {
	switch (action.type) {
		case ReceiveSelfUserAction:
			return {
				...state,
				[action.payload.user.id]: {
					user: action.payload.user,
					isFetching: false,
					receivedAt: action.payload.receivedAt,
				},
			};
		default:
			return state;
	}
}
