import { AppState } from '@core/state/app.store';
import { CurrentDataState } from '@core/state/reducers/currentData.reducer';
import AsyncStorage from '@react-native-community/async-storage';

const saveProfileData = (profileId: string, currentData: CurrentDataState): Promise<void> => {
	try {
		return AsyncStorage.setItem(`@profileData/${profileId}`, JSON.stringify(currentData));
	} catch (e) {
		console.error(e);
		return Promise.resolve();
	}
};

const getProfileData = (profileId: string): Promise<CurrentDataState | undefined> => {
	try {
		return AsyncStorage.getItem(`@profileData/${profileId}`).then((data) =>
			data !== null ? JSON.parse(data) : undefined,
		);
	} catch (e) {
		console.error(e);
		return Promise.resolve(undefined);
	}
};

const saveAppData = (data: Omit<AppState, 'currentData'>): Promise<void> => {
	try {
		return AsyncStorage.setItem('appData', JSON.stringify(data));
	} catch (e) {
		console.error(e);
		return Promise.resolve();
	}
};

const getAppData = (): Promise<Omit<AppState, 'currentData'> | undefined> => {
	try {
		return AsyncStorage.getItem('data').then((data) => (data !== null ? JSON.parse(data) : undefined));
	} catch (e) {
		console.error(e);
		return Promise.resolve(undefined);
	}
};

export const DataService = {
	saveProfileData,
	getProfileData,
	saveAppData,
	getAppData,
};
