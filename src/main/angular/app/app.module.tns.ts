import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { EntityDataModule } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from '@src/app/app-routing.module';
import { AppComponent } from '@src/app/app.component';
import { appReducers } from '@src/app/app.reducer';
import { AuthEffects } from '@src/app/core/auth/auth.effects';
import { entityConfig } from '@src/app/core/entities/entity.metadata';
import { RouterEffects } from '@src/app/core/router/router.effects';

import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from 'nativescript-angular/forms';

@NgModule({
	declarations: [AppComponent],
	imports: [
		NativeScriptModule,
		AppRoutingModule,
		NativeScriptHttpClientModule,
		StoreModule.forRoot(appReducers, {
			runtimeChecks: {
				strictStateImmutability: true,
				strictActionImmutability: true,
			},
		}),
		EffectsModule.forRoot([AuthEffects, RouterEffects]),
		StoreRouterConnectingModule.forRoot(),
		EntityDataModule.forRoot(entityConfig),
		StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
	],
	providers: [],
	bootstrap: [AppComponent],
	schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
