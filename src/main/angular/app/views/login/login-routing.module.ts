import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './login.common';

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
