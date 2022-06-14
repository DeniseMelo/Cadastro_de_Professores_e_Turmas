import { ExtensaoComponent } from './../extensao.component';
import { ListComponent } from './../components/list/list.component';
import { FormComponent } from './../components/form/form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { EditExtensaoComponent } from '../components/edit-extensao/edit-extensao.component';

const routes: Routes = [
  {
    path: 'form',
    component: FormComponent,
  },

  {
    path: '',
    pathMatch: 'full',
    component: ListComponent
  },
  {
    path: ':idExtensao',
    component: ExtensaoComponent,

  },
  {
    path: 'edit/:idExtensao',
    component: EditExtensaoComponent,
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ExtensaoRoutingModule { }


