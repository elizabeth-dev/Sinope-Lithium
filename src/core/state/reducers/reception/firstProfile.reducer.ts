import {
	CreatedFirstProfileAction,
	CreateFirstProfileAction,
	FailedCreateFirstProfileAction,
	ProfileActionsDto,
} from '@core/state/actions/profile.actions';

export interface FirstProfileState {
	error: boolean;
	isFetching: boolean;
}

const initialState: FirstProfileState = {
	error: false,
	isFetching: false,
};

export function firstProfileReducer(
	state = initialState,
	action: ProfileActionsDto,
): FirstProfileState {
	switch (action.type) {
		case CreateFirstProfileAction:
			return { ...state, isFetching: true, error: false };
		case CreatedFirstProfileAction:
			return { ...state, isFetching: false, error: false };
		case FailedCreateFirstProfileAction:
			return { ...state, isFetching: false, error: true };
		default:
			return state;
	}
}
