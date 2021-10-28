import {
	AuthActions,
	ILoginAction,
	IRegisterAction,
	ITokenExpiredAction,
	LoginAction,
	RegisterAction,
	TokenExpiredAction,
} from '@actions/auth.actions';
import { UserActions } from '@actions/user.actions';
import { AuthSrv } from '@core/api/service/auth.service';
import { firstProfileRoot } from '@shared/navigation/roots/firstProfile.root';
import { CallReturn } from '@shared/types/saga.type';
import { Navigation } from 'react-native-navigation';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { fromAuth } from '../selectors/auth.selectors';

function* loginWorker({ payload }: ILoginAction) {
	try {
		const tokenPair: CallReturn<typeof AuthSrv.login> = yield call(AuthSrv.login, payload.email, payload.password);

		yield put(AuthActions.loginSuccess(tokenPair));
		yield put(UserActions.initData());
	} catch (error) {
		yield put(AuthActions.loginFailure());
	}
}

function* registerWorker({ payload }: IRegisterAction) {
	try {
		const tokenPair: CallReturn<typeof AuthSrv.login> = yield call(AuthSrv.register, payload);

		yield put(AuthActions.registerSuccess(tokenPair));
		yield call([Navigation, Navigation.setRoot], firstProfileRoot());
	} catch (error) {
		yield put(AuthActions.registerFailure());
	}
}

function* accessTokenExpiredWorker({ payload }: ITokenExpiredAction) {
	try {
		const oldRefreshToken: string = yield select(fromAuth.refreshToken);
		const { accessToken, refreshToken, expiresAt }: CallReturn<typeof AuthSrv.login> = yield call(
			AuthSrv.refresh,
			oldRefreshToken,
		);

		yield put(AuthActions.refreshed({ accessToken, refreshToken, expiresAt }));
		yield put(payload.action);
	} catch (error) {
		// yield put(AuthActions.registerFailure());
	}
}

export function* authSaga() {
	yield takeEvery(LoginAction, loginWorker);
	yield takeEvery(RegisterAction, registerWorker);
	yield takeEvery(TokenExpiredAction, accessTokenExpiredWorker);
}