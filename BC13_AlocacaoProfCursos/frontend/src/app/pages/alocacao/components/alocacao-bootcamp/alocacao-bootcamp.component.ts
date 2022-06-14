import { TurmaBootcamp } from './../../../../models/turmaBootcamp';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Professor } from 'src/app/auth/models/professor';
import { AlocacaoService } from 'src/app/services/alocacao.service';

@Component({
  selector: 'app-alocacao-bootcamp',
  templateUrl: './alocacao-bootcamp.component.html',
  styleUrls: ['./alocacao-bootcamp.component.css']
})
export class AlocacaoBootcampComponent implements OnInit {

  turmas: TurmaBootcamp[] = []
  professores: Professor[] = []
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  formAlocacao: FormGroup = this.fb.group({
    professor: ['', [Validators.required]],
    turma: ['', [Validators.required]]
  })

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private alocacao: AlocacaoService
  ) { }

  ngOnInit(): void {
    this.alocacao.getProfessores100().subscribe(
      (professores) => {
        var i;
        for (i = 0; i < professores.length; i++) {
          if (this.professores.includes(professores[i])) { }
          else {
            this.professores.push(professores[i]);
          }
        }
      }
    )
    this.alocacao.getProfessores50().subscribe(
      (professores) => {
        var i;
        for (i = 0; i < professores.length; i++) {
          if (this.professores.includes(professores[i])){}
          else {
            this.professores.push(professores[i]);
          }
        }
      }
    )

    this.alocacao.getTurmas().subscribe((turmas) =>
      this.turmas = turmas
    )
  }

  submit() {
    const dados = {
      professor: this.formAlocacao.value.professor,
      turma: this.formAlocacao.value.turma
    }
    console.log("dados", dados.professor, dados.turma)
    this.alocacao.atribuirTurmaAoProf(dados.professor, dados.turma).subscribe()
    this.openSnackBar()
  }

  openSnackBar() {
    this._snackBar.open('Bootcamp atribuído com sucesso', 'Fechar', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });

    this.router.navigateByUrl("/alocacao")
  }
}


