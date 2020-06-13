import { authReducer, AuthState } from '@core/reducers/auth.reducer';
import { postReducer, PostState } from '@core/reducers/post.reducer';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { authEpic } from './epics/auth.epic';
import { profileReducer, ProfileState } from './reducers/profile.reducer';
import { postEpic } from './epics/post.epic';

export interface AppState {
	auth: AuthState;
	post: PostState;
	profile: ProfileState;
}

const appReducer = combineReducers<AppState>({ auth: authReducer, post: postReducer, profile: profileReducer });

const appEpic = combineEpics(authEpic, postEpic);
const epicMiddleware = createEpicMiddleware();

const configStore = () => {
	const store = createStore(appReducer, applyMiddleware(epicMiddleware));

	epicMiddleware.run(appEpic);

	return store;
};

export const appStore = configStore();
