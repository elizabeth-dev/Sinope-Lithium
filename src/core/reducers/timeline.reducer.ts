import { combineReducers } from 'redux';
import { timelineByProfileReducer } from './timeline/timelineByProfile.reducer';

export type TimelineState = ReturnType<typeof timelineReducer>;

export const timelineReducer = combineReducers({
	timelineByProfile: timelineByProfileReducer,
});
