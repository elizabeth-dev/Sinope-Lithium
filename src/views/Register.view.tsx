import { AuthActions } from '@actions/auth.actions';
import { AppState } from '@core/state/app.store';
import { RegisterScreen } from '@screens/register/RegisterScreen.component';
import { useAppDispatch } from '@shared/hooks/useAppDispatch.hook';
import { Keyboard } from 'react-native';
import { NavigationFunctionComponent } from 'react-native-navigation';
import { useSelector } from 'react-redux';

export interface RegisterViewProps {
	passEmail?: string;
}

export const RegisterView: NavigationFunctionComponent<RegisterViewProps> = ({ passEmail }) => {
	const dispatch = useAppDispatch();

	const error = useSelector((state: AppState) => state.reception.register.error);

	const onRegister = (email: string, password: string) => {
		Keyboard.dismiss();
		dispatch(AuthActions.register({ email, password }));
	};
	return <RegisterScreen passEmail={passEmail} error={error} onRegister={onRegister} />;
};
