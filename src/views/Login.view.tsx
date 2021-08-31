import { AuthActions } from '@actions/auth.actions';
import { AppState } from '@core/state/app.store';
import { LoginScreen } from '@screens/login/LoginScreen.component';
import { useAppDispatch } from '@shared/hooks/use-shallow-selector/useAppDispatch.hook';
import { registerRoot } from '@shared/navigation/roots/register.root';
import React from 'react';
import { Keyboard } from 'react-native';
import { Navigation, NavigationFunctionComponent } from 'react-native-navigation';
import { useSelector } from 'react-redux';

export const LoginView: NavigationFunctionComponent = () => {
	const dispatch = useAppDispatch();

	const error = useSelector((state: AppState) => state.reception.login.error);

	const onLogin = (email: string, password: string) => {
		Keyboard.dismiss();
		dispatch(AuthActions.login({ email, password }));
	};

	const onRegister = (email?: string) => {
		Keyboard.dismiss();
		Navigation.setRoot(registerRoot(email));
	};

	return <LoginScreen error={error} onLogin={onLogin} onRegister={onRegister} />;
};

LoginView.options = {
	blurOnUnmount: true,
};
