import { AppState } from '../app.store';

const selectSelfProfileIds = (state: AppState) => state.self.user?.user?.profiles;

export const fromUser = { profileIds: selectSelfProfileIds };
