import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		StoreModule.forRoot(appReducers, {
			runtimeChecks: {
				strictStateImmutability: true,
				strictActionImmutability: true,
			},
		}),
		EffectsModule.forRoot([AuthEffects, RouterEffects]),
		StoreRouterConnectingModule.forRoot(),
		EntityDataModule.forRoot(entityConfig),
		HttpClientModule,
		StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
