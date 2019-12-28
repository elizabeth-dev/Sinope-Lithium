import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from '@views/login/login-routing.module';
import { LoginComponent } from '@views/login/pages/login/login.component';
import { RegisterComponent } from '@views/login/pages/register/register.component';

@NgModule({
	declarations: [LoginComponent, RegisterComponent],
	imports: [CommonModule, LoginRoutingModule],
})
export class LoginModule {}
