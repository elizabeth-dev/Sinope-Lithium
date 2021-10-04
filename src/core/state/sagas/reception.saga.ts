import { LoginSuccessAction, RegisterSuccessAction } from '@actions/auth.actions';
import { CreatedFirstProfileAction } from '@actions/profile.actions';
import { UserActions } from '@actions/user.actions';
import { call, put, takeEvery } from '@redux-saga/core/effects';
import { firstProfileRoot } from '@shared/navigation/roots/firstProfile.root';
import { Navigation } from 'react-native-navigation';

function* loginSuccessWorker() {
	yield put(UserActions.requestSelf());
}

function* registerSuccessWorker() {
	yield call(Navigation.setRoot, firstProfileRoot());
}

function* createdFirstProfileWorker() {
	yield put(UserActions.requestSelf());
}

export function* receptionSaga() {
	yield takeEvery(LoginSuccessAction, loginSuccessWorker);
	yield takeEvery(RegisterSuccessAction, registerSuccessWorker);
	yield takeEvery(CreatedFirstProfileAction, createdFirstProfileWorker);
}
