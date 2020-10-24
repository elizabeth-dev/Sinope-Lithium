import { CurrentDataState } from '@core/state/reducers/currentData.reducer';

export const SwitchProfileAction = 'profile/SwitchProfileAction';

export interface ISwitchProfileAction {
	type: typeof SwitchProfileAction;
	payload: {
		profileId: string;
	};
}

const switchProfileFn = (profileId: string): ISwitchProfileAction => ({
	type: SwitchProfileAction,
	payload: { profileId },
});

export const SwitchedProfileAction = 'profile/SwitchedProfileAction';

export interface ISwitchedProfileAction {
	type: typeof SwitchedProfileAction;
	payload: {
		currentData?: CurrentDataState;
		profileId: string;
	};
}

const switchedProfileFn = (profileId: string, currentData?: CurrentDataState): ISwitchedProfileAction => ({
	type: SwitchedProfileAction,
	payload: { currentData, profileId },
});

export type SelfActionsDto = ISwitchProfileAction | ISwitchedProfileAction;

export const SelfActions = {
	switchProfile: switchProfileFn,
	switchedProfile: switchedProfileFn,
};
