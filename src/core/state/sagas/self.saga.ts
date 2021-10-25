import { ISwitchProfileAction, SelfActions, SwitchedProfileAction, SwitchProfileAction } from '@actions/self.actions';
import { DataService } from '@core/services/data.service';
import { AppState } from '@core/state/app.store';
import { fromProfile } from '@core/state/selectors/profile.selectors';
import { call, put, select, takeEvery } from '@redux-saga/core/effects';
import { dashboardRoot } from '@shared/navigation/roots/dashboard.root';
import { CallReturn } from '@shared/types/saga.type';
import { Navigation } from 'react-native-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function* switchProfileWorker({ payload }: ISwitchProfileAction) {
	const currentProfile: string = yield select(fromProfile.currentId);
	const oldData: AppState['currentData'] = yield select((state: AppState) => state.currentData);

	yield call(DataService.saveProfileData, currentProfile, oldData);

	const currentData: CallReturn<typeof DataService.getProfileData> = yield call(
		DataService.getProfileData,
		payload.profileId,
	);

	yield put(SelfActions.switchedProfile({ profileId: payload.profileId, currentData }));
}

function* switchedProfileWorker() {
	const currentProfile: CallReturn<typeof fromProfile.current> = yield select(fromProfile.current);
	const menuIcon: string = yield call(MaterialCommunityIcons.getImageSource, 'menu', 25);

	yield call(
		[Navigation, Navigation.setRoot],
		dashboardRoot(menuIcon, currentProfile?.profile?.name, currentProfile?.profile?.tag),
	);
}

export function* selfSaga() {
	yield takeEvery(SwitchProfileAction, switchProfileWorker);
	yield takeEvery(SwitchedProfileAction, switchedProfileWorker);
}
