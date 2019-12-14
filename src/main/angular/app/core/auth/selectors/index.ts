import { selectLoggedIn } from './loggedIn.selector';
import { selectUser } from './user.selector';
import { selectAuth } from './auth.selector';
import { selectError } from './error.selector';
import { selectToken } from './token.selector';

export const loggedIn = selectLoggedIn;
export const user = selectUser;
export const error = selectError;
export const state = selectAuth;
export const token = selectToken;
