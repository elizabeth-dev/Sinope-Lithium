import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { LoginRoutingModule } from '@views/login/login-routing.module';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { LoginComponent } from '@views/login/pages/login/login.component';
import { RegisterComponent } from '@views/login/pages/register/register.component';

@NgModule({
	declarations: [LoginComponent, RegisterComponent],
	imports: [LoginRoutingModule, NativeScriptCommonModule],
	schemas: [NO_ERRORS_SCHEMA],
})
export class LoginModule {}
