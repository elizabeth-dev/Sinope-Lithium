import { LoginSuccessAction, RegisterSuccessAction } from '@actions/auth.actions';
import { CreatedFirstProfileAction } from '@actions/profile.actions';
import { IRequestSelfUserAction, UserActions } from '@actions/user.actions';
import { firstProfileRoot } from '@shared/navigation/roots/firstProfile.root';
import { Navigation } from 'react-native-navigation';
import { combineEpics, Epic } from 'redux-observable';
import { filter, ignoreElements, mapTo, tap } from 'rxjs';
import { isOfType } from 'typesafe-actions';
import { AppActionsDto } from '../actions/app.actions';

const loginSuccessEpic: Epic<AppActionsDto, IRequestSelfUserAction> = (action$) =>
	action$.pipe(filter(isOfType(LoginSuccessAction)), mapTo(UserActions.requestSelf()));

const registerSuccessEpic: Epic<AppActionsDto> = (action$) =>
	action$.pipe(
		filter(isOfType(RegisterSuccessAction)),
		tap(() => Navigation.setRoot(firstProfileRoot())),
		ignoreElements(),
	);

const firstProfileSuccessEpic: Epic<AppActionsDto, IRequestSelfUserAction> = (action$) =>
	action$.pipe(filter(isOfType(CreatedFirstProfileAction)), mapTo(UserActions.requestSelf()));

export const receptionEpic = combineEpics(loginSuccessEpic, registerSuccessEpic, firstProfileSuccessEpic);
