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

const appReducer = combineReducers({
	auth: authReducer,
	reception: receptionReducer,
	self: selfReducer,
	currentData: currentDataReducer,
});
export type AppState = ReturnType<typeof appReducer>;

const appEpic = combineEpics(
	authEpic,
	postEpic,
	userEpic,
	timelineEpic,
	profileEpic,
	receptionEpic,
	selfEpic,
);
const epicMiddleware = createEpicMiddleware();

const configStore = () => {
	const store = configureStore({
		reducer: appReducer,
		middleware: (defaultMiddleware) =>
			defaultMiddleware({ thunk: false }).concat(epicMiddleware),
		devTools: __DEV__,
		// enhancers: [devToolsEnhancer({ hostname: '192.168.1.131', port: 8081 })],
	});

	epicMiddleware.run(appEpic);

	return store;
};

export const appStore = configStore();
