import { combineReducers } from 'redux';
import { profilesByIdReducer } from './profile/profilesById.reducer';

export type ProfileState = ReturnType<typeof profileReducer>;

export const profileReducer = combineReducers({
	profilesById: profilesByIdReducer,
});
