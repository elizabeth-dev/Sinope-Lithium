import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { GuestGuard } from './core/auth/guards/guest.guard';

export const routes: Routes = [
	{
		path: '',
		canLoad: [AuthGuard],
		loadChildren: () =>
			import('@src/app/views/dashboard/dashboard.module').then(
				(m) => m.DashboardModule
			),
	},
	{
		path: 'login',
		canLoad: [GuestGuard],
		loadChildren: () =>
			import('@src/app/views/login/login.module').then(
				(m) => m.LoginModule
			),
	},
];
