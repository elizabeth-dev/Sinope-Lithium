import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { authEpic } from './epics/auth.epic';
import { postEpic } from './epics/post.epic';
import { profileEpic } from './epics/profile.epic';
import { selfEpic } from './epics/self.epic';
import { timelineEpic } from './epics/timeline.epic';
import { userEpic } from './epics/user.epic';
import { authReducer } from './reducers/auth.reducer';
import { receptionReducer } from './reducers/reception.reducer';
import { receptionEpic } from './epics/reception.epic';
import { selfReducer } from './reducers/self.reducer';
import { currentDataReducer } from './reducers/currentData.reducer';
import {
	FLUSH, PAUSE, PERSIST, Persistor, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE,
} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import { searchEpic } from './epics/search.epic';

export type AppState = ReturnType<typeof appReducer>;

const appReducer = combineReducers({
	auth: authReducer,
	reception: receptionReducer,
	self: selfReducer,
	currentData: currentDataReducer,
});

const persistedAppReducer = persistReducer({
	key: 'appData',
	storage: AsyncStorage,
	version: 1,
}, appReducer);

const appEpic = combineEpics(authEpic,
	postEpic,
	userEpic,
	timelineEpic,
	profileEpic,
	receptionEpic,
	selfEpic,
	searchEpic,
);

const epicMiddleware = createEpicMiddleware();

const configStore = () => {
	const store = configureStore({
		reducer: persistedAppReducer,
		middleware: (defaultMiddleware) => defaultMiddleware({
			thunk: false,
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		})
			.concat(epicMiddleware),
		devTools: __DEV__,
	});

	epicMiddleware.run(appEpic);

	return store;
};

export const appStore = configStore();
export let appPersistor: Persistor;
export const persistorPromise = new Promise((resolve) => {
	appPersistor = persistStore(appStore, undefined, () => resolve());
});
