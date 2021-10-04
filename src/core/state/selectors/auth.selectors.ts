import { AppState } from '../app.store';

const selectRefreshToken = (state: AppState) => state.auth.refreshToken;
const selectAccessToken = (state: AppState) => state.auth.accessToken;

export const fromAuth = { refreshToken: selectRefreshToken, accessToken: selectAccessToken };
