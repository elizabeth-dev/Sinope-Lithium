import { InitializeDataAction, InitializeDataSuccessAction, UserActionsDto } from '@actions/user.actions';
import { UserEntity } from '@shared/types/entities/user.interface';

export type SelfUserState = UserEntity | null;

const initialState: SelfUserState = null;

export function selfUserReducer(state = initialState, action: UserActionsDto): SelfUserState {
	switch (action.type) {
		case InitializeDataAction:
			// @ts-ignore
			return { ...state, isFetching: true };
		case InitializeDataSuccessAction:
			return { ...state, user: action.payload.user, isFetching: false, receivedAt: action.payload.receivedAt };
		default:
			return state;
	}
}
