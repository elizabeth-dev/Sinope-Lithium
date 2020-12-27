import { AnyAction, combineReducers } from 'redux';
import { ISwitchedProfileAction, SwitchedProfileAction } from '../actions/self.actions';
import { postReducer } from './currentData/post.reducer';
import { profileReducer } from './currentData/profile.reducer';
import { timelineReducer } from './currentData/timeline.reducer';
import { searchReducer } from './currentData/search.reducer';
import { questionReducer } from './currentData/question.reducer';


export const _currentDataReducer = combineReducers({
	post: postReducer,
	profile: profileReducer,
	timeline: timelineReducer,
	search: searchReducer,
	question: questionReducer,
});

export type CurrentDataState = ReturnType<typeof currentDataReducer>;

export const currentDataReducer: typeof _currentDataReducer = (state, action) => {
	switch ((action as AnyAction).type) {
		case SwitchedProfileAction:
			return _currentDataReducer((action as unknown as ISwitchedProfileAction).payload.currentData, action);
		default:
			return _currentDataReducer(state, action);
	}
};
