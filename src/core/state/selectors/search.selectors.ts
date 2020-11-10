import { AppState } from '../app.store';

const selectHistory = (state: AppState) => state.currentData.search.history;

const selectSearchResult = (state: AppState, term: string) => state.currentData.search.cache[term];

export const fromSearch = {
	history: selectHistory,
	result: selectSearchResult,
};
