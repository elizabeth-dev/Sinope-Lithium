import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { routes } from '@src/app/app.routes';

@NgModule({
	imports: [
		NativeScriptRouterModule.forRoot(routes, { enableTracing: true }),
	],
	exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}
