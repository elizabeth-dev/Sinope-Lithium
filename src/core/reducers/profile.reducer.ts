import { combineReducers } from 'redux';
import { selfProfilesReducer } from './profile/selfProfile.reducer';
import { profilesByIdReducer } from './profile/profilesById.reducer';

export type ProfileState = ReturnType<typeof profileReducer>;

export const profileReducer = combineReducers({
	profilesById: profilesByIdReducer,
	self: selfProfilesReducer,
});
