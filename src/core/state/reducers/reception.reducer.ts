import { combineReducers } from 'redux';
import { loginReducer } from './reception/login.reducer';
import { registerReducer } from './reception/register.reducer';
import { firstProfileReducer } from './reception/firstProfile.reducer';

export type ReceptionState = ReturnType<typeof receptionReducer>;

export const receptionReducer = combineReducers({
	login: loginReducer,
	register: registerReducer,
	firstProfile: firstProfileReducer,
});
