import { createSelector } from '@ngrx/store';

import { selectAuth } from './auth.selector';
import { AuthState } from '../auth.reducer';

export const selectToken = createSelector(
	selectAuth,
	(state: AuthState) => state.token
);
