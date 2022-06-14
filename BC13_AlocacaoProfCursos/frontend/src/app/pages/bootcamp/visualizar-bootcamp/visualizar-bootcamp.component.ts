import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BootcampService } from 'src/app/services/bootcamp.service';

import { MatDialog } from '@angular/material/dialog';
import { ProfessorService } from 'src/app/services/professor.service';
import { Professor } from 'src/app/auth/models/professor';
import { Boot } from '../boot';


@Component({
  selector: 'app-visualizar-bootcamp',
  templateUrl: './visualizar-bootcamp.component.html',
  styleUrls: ['./visualizar-bootcamp.component.css']
})
export class VisualizarBootcampComponent implements OnInit {


  alimentaDialog!: Boot;
  id!: number;
  alimentaProfs!: Professor[]


  constructor(
    private bootcampService: BootcampService,
    public dialog: MatDialog,
    private profService: ProfessorService
  ) {}

  ngOnInit() {
    this.iniciarDados(this.id);
    this.buscaProfessores(this.id)
  }


  iniciarDados(id: number) {
    console.log(id)
    this.bootcampService.buscarIdBootcamp(id ).subscribe(
      (turma) => {
        console.log(turma)
        this.alimentaDialog = turma;
      }
    )
  }

  buscaProfessores(id: number){

    this.profService.getProfessoresPorTurma(id).subscribe(
      (professores) => {
        this.alimentaProfs = professores;
        console.log(this.alimentaProfs)
      }
    )
  }




}
