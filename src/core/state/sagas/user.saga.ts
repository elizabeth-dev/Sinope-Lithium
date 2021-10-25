import { AuthActions } from '@actions/auth.actions';
import { IInitializeDataAction, InitializeDataAction, UserActions } from '@actions/user.actions';
import { UserService } from '@core/api/service/user.service';
import { userResToIUser } from '@core/mapper/user.mapper';
import { fromProfile } from '@core/state/selectors/profile.selectors';
import { call, put, select, takeEvery } from '@redux-saga/core/effects';
import { dashboardRoot } from '@shared/navigation/roots/dashboard.root';
import { firstProfileRoot } from '@shared/navigation/roots/firstProfile.root';
import { CallReturn } from '@shared/types/saga.type';
import { Navigation } from 'react-native-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { fromAuth } from '../selectors/auth.selectors';
import { fromUser } from '../selectors/user.selectors';

function* initializeDataWorker(action: IInitializeDataAction) {
	try {
		const accessToken: string = yield select(fromAuth.accessToken);

		const self: CallReturn<typeof UserService.getSelf> = yield call(UserService.getSelf, accessToken);

		yield put(UserActions.initSuccess({ user: userResToIUser(self, Date.now()), receivedAt: Date.now() }));

		const profiles: string[] | undefined = yield select(fromUser.profileIds);
		if (!profiles?.length) {
			yield call([Navigation, Navigation.setRoot], firstProfileRoot());
		} else {
			const currentProfile: CallReturn<typeof fromProfile.current> = yield select(fromProfile.current);
			const menuIcon: string = yield call(MaterialCommunityIcons.getImageSource, 'menu', 25);

			yield call(
				[Navigation, Navigation.setRoot],
				dashboardRoot(menuIcon, currentProfile?.profile?.name, currentProfile?.profile?.tag),
			);
		}
	} catch (error: any) {
		if (error.status === 401) yield put(AuthActions.expired({ action }));
	}
}

export function* userSaga() {
	yield takeEvery(InitializeDataAction, initializeDataWorker);
}
