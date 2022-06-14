import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainNavComponent } from './main-nav.component';

const routes: Routes = [
  {
    path: '',
    component: MainNavComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainNavRoutingModule { }
