import { applyMiddleware, combineReducers, createStore } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { authEpic } from './epics/auth.epic';
import { postEpic } from './epics/post.epic';
import { authReducer } from './reducers/auth.reducer';
import { postReducer } from './reducers/post.reducer';
import { profileReducer } from './reducers/profile.reducer';

const appReducer = combineReducers({ auth: authReducer, post: postReducer, profile: profileReducer });
export type AppState = ReturnType<typeof appReducer>;

const appEpic = combineEpics(authEpic, postEpic);
const epicMiddleware = createEpicMiddleware();

const configStore = () => {
	const store = createStore(appReducer, applyMiddleware(epicMiddleware));

	epicMiddleware.run(appEpic);

	return store;
};

export const appStore = configStore();
