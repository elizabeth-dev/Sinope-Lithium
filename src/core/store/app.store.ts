import { authReducer } from '@core/reducers/auth.reducer';
import { postReducer } from '@core/reducers/post.reducer';
import { combineReducers, createStore } from 'redux';

const appReducer = combineReducers({ auth: authReducer, post: postReducer });

export const AppStore = createStore(appReducer);
