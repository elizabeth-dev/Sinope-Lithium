import AsyncStorage from '@react-native-community/async-storage';
import { all } from '@redux-saga/core/effects';
import { configureStore } from '@reduxjs/toolkit';
import { fetchingTransform } from '@shared/utils/redux.utils';
import { combineReducers } from 'redux';
import {
	FLUSH,
	PAUSE,
	PERSIST,
	Persistor,
	persistReducer,
	persistStore,
	PURGE,
	REGISTER,
	REHYDRATE,
} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { authReducer } from './reducers/auth.reducer';
import { currentDataReducer } from './reducers/currentData.reducer';
import { receptionReducer } from './reducers/reception.reducer';
import { selfReducer } from './reducers/self.reducer';
import { authSaga } from './sagas/auth.saga';
import { postSaga } from './sagas/post.saga';
import { profileSaga } from './sagas/profile.saga';
import { questionSaga } from './sagas/question.saga';
import { searchSaga } from './sagas/search.saga';
import { selfSaga } from './sagas/self.saga';
import { timelineSaga } from './sagas/timeline.saga';
import { userSaga } from './sagas/user.saga';

export type AppState = ReturnType<typeof appReducer>;

const appReducer = combineReducers({
	auth: authReducer,
	reception: receptionReducer,
	self: selfReducer,
	currentData: currentDataReducer,
});

const persistedAppReducer = persistReducer(
	{
		key: 'appData',
		storage: AsyncStorage,
		version: 1,
		transforms: [fetchingTransform], // TODO: Measure performance impact of this. Is it really necessary?
	},
	appReducer,
);

function* appSaga() {
	yield all([
		authSaga(),
		postSaga(),
		profileSaga(),
		questionSaga(),
		searchSaga(),
		selfSaga(),
		timelineSaga(),
		userSaga(),
	]);
}

const sagaMiddleware = createSagaMiddleware();

const configStore = () => {
	const store = configureStore({
		reducer: persistedAppReducer,
		middleware: (defaultMiddleware) =>
			defaultMiddleware({
				thunk: false,
				serializableCheck: {
					ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
				},
			}).concat(sagaMiddleware),
		devTools: __DEV__,
	});

	sagaMiddleware.run(appSaga);

	return store;
};

export const appStore = configStore();
export let appPersistor: Persistor;
export const persistorPromise = new Promise<void>((resolve) => {
	appPersistor = persistStore(appStore, undefined, () => resolve());
});
