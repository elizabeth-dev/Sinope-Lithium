import { loggerMiddleware } from '@shared/middleware/logger.middleware';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { authEpic } from './epics/auth.epic';
import { postEpic } from './epics/post.epic';
import { timelineEpic } from './epics/timeline.epic';
import { userEpic } from './epics/user.epic';
import { authReducer } from './reducers/auth.reducer';
import { postReducer } from './reducers/post.reducer';
import { profileReducer } from './reducers/profile.reducer';
import { timelineReducer } from './reducers/timeline.reducer';
import { userReducer } from './reducers/user.reducer';
import { profileEpic } from './epics/profile.epic';

const appReducer = combineReducers({
	auth: authReducer,
	post: postReducer,
	profile: profileReducer,
	user: userReducer,
	timeline: timelineReducer,
});
export type AppState = ReturnType<typeof appReducer>;

const appEpic = combineEpics(authEpic, postEpic, userEpic, timelineEpic, profileEpic);
const epicMiddleware = createEpicMiddleware();

const configStore = () => {
	const store = createStore(
		appReducer,
		applyMiddleware(epicMiddleware, loggerMiddleware),
	);

	epicMiddleware.run(appEpic);

	return store;
};

export const appStore = configStore();
