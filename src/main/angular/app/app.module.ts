import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { EntityDataModule } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from '@src/app/app-routing.module';
import { AppComponent } from '@src/app/app.component';
import { HomeComponent } from '@src/app/home/home.component';
import { appReducers } from '@src/app/app.reducer';
import { AuthEffects } from '@src/app/core/auth/auth.effects';
import { entityConfig } from '@src/app/core/entities/entity.metadata';
import { RouterEffects } from '@src/app/core/router/router.effects';


@NgModule({
	declarations: [AppComponent, HomeComponent],
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
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
