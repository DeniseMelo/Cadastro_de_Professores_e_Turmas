import { AlocacaoComponent } from './pages/alocacao/alocacao.component';
import { NovoUsuarioComponent } from './pages/usuario/components/form/novo-usuario/novo-usuario.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthModule } from './auth/auth.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BootcampListComponent } from './pages/bootcamp/bootcamp-list/bootcamp-list.component';
import { BootcampNovoComponent } from './pages/bootcamp/bootcamp-novo/bootcamp-novo.component';
import { VisualizarBootcampComponent } from './pages/bootcamp/visualizar-bootcamp/visualizar-bootcamp.component';
import { BootcampEditComponent } from './pages/bootcamp/bootcamp-edit/bootcamp-edit.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { ListaUsuarioComponent } from './pages/usuario/components/list/lista-usuario/lista-usuario.component';
import { BootcampCarreiraComponent } from './pages/bootcamp/bootcamp-carreira/bootcamp-carreira.component';

const routes: Routes = [

  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>  import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'professor',
    loadChildren: () => { // Lazy Loading
      return import('./pages/professor/professor.module')
      .then((m) => {
        return m.ProfessorModule
      })
    }},
    {
      path: 'extensao',
      loadChildren: () => {
        return import('./pages/extensao/extensao.module')
        .then((m) => {
          return m.ExtensaoModule
        })
      }
    },
    {
    path: 'home',
    pathMatch: 'full',
    component: HomeComponent
    },
  {

    path: 'bootcamp',
    component: BootcampListComponent
    },
    {
      path: 'bootcamp/novo',
      component: BootcampNovoComponent
    },
    {
      path:'bootcamp/carreira',
      component: BootcampCarreiraComponent
    },
    {
      path: 'ver/:id',
      component: VisualizarBootcampComponent
    },
    {
      path: 'editar/:id',
      component: BootcampEditComponent
    },
    {
      path: `${localStorage.getItem('login')}`,
      component: UsuarioComponent
    },
    /* {
      path: 'usuario/lista',
      component: ListaUsuarioComponent
    }, */
    {
      path: 'usuario/novoUsuario',
      component: NovoUsuarioComponent
    },
    {
      path: 'alocacao',
      component: AlocacaoComponent
    }
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule

  ],
  providers:[]
})
export class AppRoutingModule {}
