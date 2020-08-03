import { AppState } from '@core/app.store';

const selectProfileById = (state: AppState, id: string) =>
	state.profile.profilesById[id];

const selectCurrentProfileId = (state: AppState) => state.profile.self.current;

const selectCurrentProfile = (state: AppState) =>
	state.profile.profilesById[state.profile.self.current];

const selectMyProfiles = (state: AppState) =>
	state.profile.self.profiles.map(
		(profile) => state.profile.profilesById[profile],
	);

export const fromProfile = {
	byId: selectProfileById,
	currentId: selectCurrentProfileId,
	current: selectCurrentProfile,
	mine: selectMyProfiles,
};
