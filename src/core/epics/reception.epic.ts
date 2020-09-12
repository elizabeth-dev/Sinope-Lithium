import { AppActionsDto } from '@core/actions';
import { LoginSuccessAction, RegisterSuccessAction } from '@core/actions/auth.actions';
import { CreatedFirstProfileAction } from '@core/actions/profile.actions';
import { IRequestSelfUserAction, UserActions } from '@core/actions/user.actions';
import { firstProfileRoot } from '@shared/navigation/roots/firstProfile.root';
import { Navigation } from 'react-native-navigation';
import { combineEpics, Epic } from 'redux-observable';
import { filter, ignoreElements, mapTo, tap } from 'rxjs/operators';
import { isOfType } from 'typesafe-actions';

const loginSuccessEpic: Epic<AppActionsDto, IRequestSelfUserAction> = (
	action$,
) =>
	action$.pipe(
		filter(isOfType(LoginSuccessAction)),
		mapTo(UserActions.requestSelf()),
	);

const registerSuccessEpic: Epic<AppActionsDto> = (action$) =>
	action$.pipe(
		filter(isOfType(RegisterSuccessAction)),
		tap(() => Navigation.setRoot(firstProfileRoot())),
		ignoreElements(),
	);

const firstProfileSuccessEpic: Epic<AppActionsDto, IRequestSelfUserAction> = (
	action$,
) =>
	action$.pipe(
		filter(isOfType(CreatedFirstProfileAction)),
		mapTo(UserActions.requestSelf()),
	);

export const receptionEpic = combineEpics(
	loginSuccessEpic,
	registerSuccessEpic,
	firstProfileSuccessEpic,
);
