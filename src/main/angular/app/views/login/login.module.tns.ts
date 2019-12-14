import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { LoginRoutingModule } from './login-routing.module';
import { NativeScriptCommonModule } from 'nativescript-angular/common';


@NgModule({
  declarations: [],
  imports: [
    LoginRoutingModule,
    NativeScriptCommonModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class LoginModule { }
