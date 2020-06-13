import { AppScreens } from '@core/app.screens';
import React from 'react';
import { View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Button, TextInput } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { LoginScreenStyles as styles } from './LoginScreen.styles';

export const LoginScreen: React.FC = () => {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');

	const onLogin = () => {
		Promise.all([MaterialCommunityIcons.getImageSource('menu', 25)]).then(([menuIcon]) => {
			Navigation.setRoot({
				root: {
					sideMenu: {
						left: {
							component: {
								name: AppScreens.DrawerScreen,
							},
						},
						center: {
							stack: {
								id: 'testComponentId',
								children: [
									{
										component: {
											name: AppScreens.DashboardScreen,
											options: {
												topBar: {
													leftButtons: [
														{
															id: 'DASHBOARD_MENU',
															icon: menuIcon,
															text: 'Menú',
														},
													],
												},
											},
										},
									},
								],
								options: {
									topBar: {
										elevation: 0,
										title: { text: 'Elizabeth' },
										subtitle: { text: '@Elizabeth' },
									},
								},
							},
						},
					},
				},
			});
		});
	};

	return (
		<View style={styles.root}>
			<TextInput style={styles.input} label="Email" mode="outlined" value={email} onChangeText={setEmail} />
			<TextInput
				style={styles.input}
				label="Password"
				mode="outlined"
				value={password}
				onChangeText={setPassword}
			/>
			<Button
				style={styles.loginButton}
				contentStyle={styles.loginButtonContent}
				mode="contained"
				onPress={onLogin}>
				Log In
			</Button>
		</View>
	);
};
