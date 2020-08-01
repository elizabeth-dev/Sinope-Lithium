import { AppState } from '@core/app.store';

const selectProfileById = (state: AppState, id: string) =>
	state.profile.profilesById[id];

const selectCurrentProfileId = (state: AppState) => state.profile.self.current;

const selectCurrentProfile = (state: AppState) =>
	state.profile.profilesById[state.profile.self.current];

export const fromProfile = {
	byId: selectProfileById,
	currentId: selectCurrentProfileId,
	current: selectCurrentProfile,
};
