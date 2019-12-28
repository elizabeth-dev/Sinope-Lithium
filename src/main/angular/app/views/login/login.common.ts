import { Routes } from '@angular/router';
import { LoginComponent } from '@views/login/pages/login/login.component';
import { RegisterComponent } from '@views/login/pages/register/register.component';

export const componentDeclarations: any[] = [];

export const providerDeclarations: any[] = [];

export const routes: Routes = [
	{
		path: '',
		component: LoginComponent,
	},
	{
		path: 'register',
		component: RegisterComponent,
	},
];
