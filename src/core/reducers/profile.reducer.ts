import { combineReducers } from 'redux';
import { profilesByIdReducer, ProfilesByIdState } from './profile/profilesById.reducer';

export interface ProfileState {
	profilesById: ProfilesByIdState;
}

export const profileReducer = combineReducers<ProfileState>({
	profilesById: profilesByIdReducer,
});
