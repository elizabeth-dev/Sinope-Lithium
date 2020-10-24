import { combineReducers } from 'redux';
import { selfUserReducer } from './self/selfUser.reducer';
import { selfProfileReducer } from './self/selfProfile.reducer';

export type SelfState = ReturnType<typeof selfReducer>;

export const selfReducer = combineReducers({
	user: selfUserReducer,
	currentProfile: selfProfileReducer,
});
