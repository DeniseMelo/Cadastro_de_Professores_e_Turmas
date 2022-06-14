import { Component, OnInit } from '@angular/core';
import { Professor } from 'src/app/auth/models/professor';
import { ProfessorService } from 'src/app/services/professor.service';

@Component({
  selector: 'app-profs100',
  templateUrl: './profs100.component.html',
  styleUrls: ['./profs100.component.css']
})
export class Profs100Component implements OnInit {

  professores: Professor[] = []
  
  constructor(private professorService: ProfessorService) { }

  ngOnInit(): void {  
    this.mostrarProfessores()
  }
  mostrarProfessores(){this.professorService.getProfessores100().subscribe(
    (professores) => {
      this.professores = professores
    }
  )
}

}