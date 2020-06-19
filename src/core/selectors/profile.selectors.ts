import { AppState } from '@core/app.store';
import { createSelector } from '@reduxjs/toolkit';
import { ProfilesByIdState } from '@core/reducers/profile/profilesById.reducer';

const selectProfileState = (state: AppState) => state.profile;

const selectProfiles = createSelector(selectProfileState, (state) => state.profilesById);

const selectProfileById = createSelector(selectProfiles, (id: string, state: ProfilesByIdState) => state[id]);

const selectSelfProfiles = createSelector(selectProfileState, (state) => state.self);

const selectCurrentProfileId = createSelector(selectSelfProfiles, (state) => state.current);

const selectCurrentProfile = createSelector(selectCurrentProfileId, selectProfileById);

export const fromProfile = {
	currentId: selectCurrentProfileId,
	current: selectCurrentProfile,
};
