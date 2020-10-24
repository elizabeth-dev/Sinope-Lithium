import { ReceiveSelfUserAction, UserActionsDto } from '@core/state/actions/user.actions';
import { UserEntity } from '@shared/types/entities/user.interface';

export interface UsersByIdState {
	[id: string]: UserEntity;
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
