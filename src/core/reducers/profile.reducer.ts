import { combineReducers } from 'redux';
import { profilesByIdReducer, ProfilesByIdState } from './profile/profilesById.reducer';
import { SelfProfilesState, selfProfilesReducer } from './profile/currentProfile.reducer';

export interface ProfileState {
	profilesById: ProfilesByIdState;
	self: SelfProfilesState;
}

export const profileReducer = combineReducers<ProfileState>({
	profilesById: profilesByIdReducer,
	self: selfProfilesReducer,
});
