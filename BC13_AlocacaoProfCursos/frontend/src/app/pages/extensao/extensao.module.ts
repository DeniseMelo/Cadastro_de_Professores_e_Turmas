import { MainNavModule } from 'src/app/main-nav/main-nav.module';
import { AuthModule } from './../../auth/auth.module';
import { ExtensaoRoutingModule } from './extensao-routing/extensao-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { ExtensaoComponent } from './extensao.component';
import { DeleteDialogExtensaoComponent } from './components/delete-dialog-extensao/delete-dialog-extensao.component';
import { EditExtensaoComponent } from './components/edit-extensao/edit-extensao.component';
import { FormComponent } from './components/form/form.component';
import { ListComponent } from './components/list/list.component';
import { DialogDetalhesExtensaoComponent } from './components/dialog-detalhes-extensao/dialog-detalhes-extensao.component';


@NgModule({
  declarations: [
    ExtensaoComponent,
    FormComponent,
    ListComponent,
    EditExtensaoComponent,
    DeleteDialogExtensaoComponent,
    DialogDetalhesExtensaoComponent

  ],
  imports: [
    MaterialModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    ExtensaoRoutingModule,
    AuthModule,
    MainNavModule

  ],
  providers: []

})
export class ExtensaoModule { }