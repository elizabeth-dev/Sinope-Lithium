import { NgModule } from '@angular/core';

import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { routes } from './login.common';

@NgModule({
	imports: [NativeScriptRouterModule.forChild(routes)],
	exports: [NativeScriptRouterModule],
})
export class LoginRoutingModule {}
