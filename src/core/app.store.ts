import { authReducer, AuthState } from '@core/reducers/auth.reducer';
import { postReducer, PostState } from '@core/reducers/post.reducer';
import { combineReducers, createStore } from 'redux';

export interface AppState {
	auth: AuthState;
	post: PostState;
}

const appReducer = combineReducers<AppState>({ auth: authReducer, post: postReducer });

export const AppStore = createStore(appReducer);
