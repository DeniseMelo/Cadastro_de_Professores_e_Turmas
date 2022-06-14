import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HABILIDADESTECNICAS } from 'src/app/models/habilidadeTecnicas';
import { Professor } from '../professor';
import { ProfessorHttpService } from '../services/professor-http.service';

@Component({
  selector: 'app-dialog-detalhes-profs',
  templateUrl: './dialog-detalhes-profs.component.html',
  styleUrls: ['./dialog-detalhes-profs.component.css']
})
export class DialogProfessorComponent implements OnInit {

  idProfessor!: number
  professor!: Professor
  habilidades: Array<HABILIDADESTECNICAS> = []

  constructor(
    private route: ActivatedRoute,
    private funHttpService: ProfessorHttpService
  ) { }

  ngOnInit(): void {

    //this.idProfessor = parseInt(this.route.snapshot.paramMap.get('idProfessor') || '')

    this.funHttpService.buscarIdProfessor(this.idProfessor)
    .subscribe(
      (fun) => {
        this.professor = fun
        console.log(this.professor)
      }
    )
  }

}
