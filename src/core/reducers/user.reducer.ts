import { combineReducers } from 'redux';
import { selfUserReducer } from './user/selfUser.reducer';
import { usersByIdReducer } from './user/usersById.reducer';

export type UserState = ReturnType<typeof userReducer>;

export const userReducer = combineReducers({
	usersById: usersByIdReducer,
	self: selfUserReducer,
});
