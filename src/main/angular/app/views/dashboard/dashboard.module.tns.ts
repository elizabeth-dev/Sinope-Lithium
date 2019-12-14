import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { NativeScriptCommonModule } from 'nativescript-angular/common';


@NgModule({
  declarations: [],
  imports: [
    DashboardRoutingModule,
    NativeScriptCommonModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class DashboardModule { }
