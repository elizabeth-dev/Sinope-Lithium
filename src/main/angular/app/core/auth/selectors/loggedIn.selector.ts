import { createSelector } from '@ngrx/store';

import { selectAuth } from './auth.selector';
import { AuthState } from '../auth.reducer';

export const selectLoggedIn = createSelector(
	selectAuth,
	(state: AuthState) => state.loggedIn
);
