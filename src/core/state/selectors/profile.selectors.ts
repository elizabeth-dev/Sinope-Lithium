import { AppState } from '@core/state/app.store';

const selectProfilesByIdState = (state: AppState) => state.currentData.profile.profilesById;

const selectProfileById = (state: AppState, id: string) =>
	state.currentData.profile.profilesById[id];

const selectCurrentProfileId = (state: AppState) => state.self.currentProfile;

const selectCurrentProfile = (state: AppState) =>
	state.currentData.profile.profilesById[state.self.currentProfile];

const selectMyProfiles = (state: AppState) =>
	state.self.user?.user?.profiles?.map(
		(profile) => state.currentData.profile.profilesById[profile.id],
	);

export const fromProfile = {
	byId: selectProfileById,
	currentId: selectCurrentProfileId,
	current: selectCurrentProfile,
	mine: selectMyProfiles,
	state: {
		byId: selectProfilesByIdState,
	},
};
