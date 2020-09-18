import AsyncStorage from '@react-native-community/async-storage';
import { CurrentDataState } from '@core/reducers/currentData.reducer';
import { from, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

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
		return from(AsyncStorage.getItem(`@profileData/${profileId}`))
			.pipe(map((data) => data !== null ? JSON.parse(data) : undefined));

	} catch (e) {
		console.error(e);
		return of(undefined);
	}
};

export const DataService = {
	saveProfileData,
	getProfileData,
};
