import { MainNavModule } from 'src/app/main-nav/main-nav.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { CadastroProfessorComponent } from './cadastro-professor/cadastro-professor.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { EditProfessorComponent } from './edit-professor/edit-professor.component';
import { ProfessorRoutingModule } from './professor-routing.module';
import { DialogProfessorComponent } from './dialog-detalhes-profs/dialog-detalhes-profs.component';
import { ListaProfessorComponent } from './lista-professor/lista-professor.component';


@NgModule({
    declarations:[
        CadastroProfessorComponent,
        DeleteDialogComponent,
        DialogProfessorComponent,
        EditProfessorComponent,
        ListaProfessorComponent
    ],
    imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    ProfessorRoutingModule,
    MainNavModule

    ],
    providers:[

    ]
})

export class ProfessorModule { }