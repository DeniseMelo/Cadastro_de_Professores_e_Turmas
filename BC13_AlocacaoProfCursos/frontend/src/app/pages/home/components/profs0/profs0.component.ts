import { Component, OnInit } from '@angular/core';
import { Professor } from 'src/app/auth/models/professor';
import { ProfessorService } from 'src/app/services/professor.service';

@Component({
  selector: 'app-profs0',
  templateUrl: './profs0.component.html',
  styleUrls: ['./profs0.component.css']
})
export class Profs0Component implements OnInit {

  professores: Professor[] = []
  
  constructor(private professorService: ProfessorService) { }

  ngOnInit(): void {  
    this.mostrarProfessores()
  }
  mostrarProfessores(){this.professorService.getProfessores0().subscribe(
    (professores) => {
      this.professores = professores
    }
  )
}
}
