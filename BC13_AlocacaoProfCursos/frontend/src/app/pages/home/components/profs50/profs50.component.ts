import { Component, OnInit } from '@angular/core';
import { Professor } from 'src/app/auth/models/professor';
 
import { ProfessorService } from 'src/app/services/professor.service';

@Component({
  selector: 'app-profs50',
  templateUrl: './profs50.component.html',
  styleUrls: ['./profs50.component.css']
})
export class Profs50Component implements OnInit {
  professores: Professor[] = []
  
  constructor(private professorService: ProfessorService) { }

  ngOnInit(): void {  
    this.mostrarProfessores()
  }
  mostrarProfessores(){this.professorService.getProfessores50().subscribe(
    (professores) => {
      this.professores = professores
    }
  )
}

}