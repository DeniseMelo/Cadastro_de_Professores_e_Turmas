import { AuthModule } from './auth/auth.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BootcampListComponent } from './pages/bootcamp/bootcamp-list/bootcamp-list.component';
import { BootcampNovoComponent } from './pages/bootcamp/bootcamp-novo/bootcamp-novo.component';
import { BootcampEditComponent } from './pages/bootcamp/bootcamp-edit/bootcamp-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BootcampConfirmDialogComponent } from './pages/bootcamp/bootcamp-confirm-dialog/bootcamp-confirm-dialog.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { VisualizarBootcampComponent } from './pages/bootcamp/visualizar-bootcamp/visualizar-bootcamp.component';
import { MaterialModule } from './material/material.module';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { MainNavModule } from './main-nav/main-nav.module';
import { HomeComponent } from './pages/home/home.component';
import { Profs50Component } from './pages/home/components/profs50/profs50.component';
import { Profs100Component } from './pages/home/components/profs100/profs100.component';
import { BootcampTableComponent } from './pages/bootcamp/bootcamp-table/bootcamp-table.component';
import { Profs0Component } from './pages/home/components/profs0/profs0.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { ListaUsuarioComponent } from './pages/usuario/components/list/lista-usuario/lista-usuario.component';
import { TableComponent } from './pages/usuario/components/list/lista-usuario/table/table.component';
import { DeleteDialogComponent } from './pages/usuario/components/dialog/delete-dialog/delete-dialog.component';
import { NovoUsuarioComponent } from './pages/usuario/components/form/novo-usuario/novo-usuario.component';
import { FormComponent } from './pages/usuario/components/form/form/form.component';
import { BootcampCarreiraComponent } from './pages/bootcamp/bootcamp-carreira/bootcamp-carreira.component';
import { FormCarreiraComponent } from './pages/bootcamp/form-carreira/form-carreira.component';
import { AlocacaoComponent } from './pages/alocacao/alocacao.component';
import { AlocacaoExtensaoComponent } from './pages/alocacao/components/alocacao-extensao/alocacao-extensao.component';
import { AlocacaoBootcampComponent } from './pages/alocacao/components/alocacao-bootcamp/alocacao-bootcamp.component';


@NgModule({
  declarations: [
    AppComponent,
    BootcampListComponent,
    BootcampNovoComponent,
    BootcampEditComponent,
    BootcampConfirmDialogComponent,
    VisualizarBootcampComponent,
    FormCarreiraComponent,
    HomeComponent,
    Profs50Component,
    Profs100Component,
    BootcampTableComponent,
    Profs0Component,
    UsuarioComponent,
    ListaUsuarioComponent,
    TableComponent,
    DeleteDialogComponent,
    NovoUsuarioComponent,
    FormComponent,
    BootcampCarreiraComponent,
    AlocacaoComponent,
    AlocacaoExtensaoComponent,
    AlocacaoBootcampComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    AuthModule,
    HttpClientModule,
    AuthModule.forRoot(),
    AuthRoutingModule,
    MainNavModule,
    HttpClientModule

  ],
  providers: [

  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
