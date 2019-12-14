import { AppState } from '../../../app.reducer';
import { createFeatureSelector } from '@ngrx/store';
import { AuthState } from '../auth.reducer';

export const selectAuth = createFeatureSelector<AppState, AuthState>('auth');
