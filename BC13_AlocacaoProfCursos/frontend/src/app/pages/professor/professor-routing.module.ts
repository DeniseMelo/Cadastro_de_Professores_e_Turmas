import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CadastroProfessorComponent } from "./cadastro-professor/cadastro-professor.component";
import { EditProfessorComponent } from "./edit-professor/edit-professor.component";
import { ListaProfessorComponent } from "./lista-professor/lista-professor.component";

const routes: Routes = [
  
   {
    path: 'cadastro',
    component: CadastroProfessorComponent
   },  
  
   {
      path: '',
      pathMatch: 'full',
      component: ListaProfessorComponent
   },
   {
    path: 'edit/:idProfessor',
    component: EditProfessorComponent
  
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

  export class ProfessorRoutingModule { }