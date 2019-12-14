import { AuthState, authReducer } from './core/auth/auth.reducer';

import { ActionReducerMap } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

export interface AppState {
	auth: AuthState;
	router: RouterReducerState;
}

export const appReducers: ActionReducerMap<AppState> = {
	auth: authReducer,
	router: routerReducer,
};
