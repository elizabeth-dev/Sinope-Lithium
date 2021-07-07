import { AppState } from '@core/state/app.store';
import { CurrentDataState } from '@core/state/reducers/currentData.reducer';
import AsyncStorage from '@react-native-community/async-storage';
import { from, map, Observable, of } from 'rxjs';

const saveProfileData = (profileId: string, currentData: CurrentDataState): Observable<void> => {
	try {
		return from(AsyncStorage.setItem(`@profileData/${profileId}`, JSON.stringify(currentData)));
	} catch (e) {
		console.error(e);
		return of();
	}
};

const getProfileData = (profileId: string): Observable<CurrentDataState | undefined> => {
	try {
		return from(AsyncStorage.getItem(`@profileData/${profileId}`)).pipe(
			map((data) => (data !== null ? JSON.parse(data) : undefined)),
		);
	} catch (e) {
		console.error(e);
		return of(undefined);
	}
};

const saveAppData = (data: Omit<AppState, 'currentData'>): Observable<void> => {
	try {
		return from(AsyncStorage.setItem('appData', JSON.stringify(data)));
	} catch (e) {
		console.error(e);
		return of();
	}
};

const getAppData = (): Observable<Omit<AppState, 'currentData'> | undefined> => {
	try {
		return from(AsyncStorage.getItem('data')).pipe(map((data) => (data !== null ? JSON.parse(data) : undefined)));
	} catch (e) {
		console.error(e);
		return of(undefined);
	}
};

export const DataService = {
	saveProfileData,
	getProfileData,
	saveAppData,
	getAppData,
};
