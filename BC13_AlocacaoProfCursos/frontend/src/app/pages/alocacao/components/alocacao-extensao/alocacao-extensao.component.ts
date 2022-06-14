import { AlocacaoService } from './../../../../services/alocacao.service';
import { Extensao } from './../../../extensao/components/model/extensao';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Professor } from 'src/app/auth/models/professor';

@Component({
  selector: 'app-alocacao-extensao',
  templateUrl: './alocacao-extensao.component.html',
  styleUrls: ['./alocacao-extensao.component.css']
})
export class AlocacaoExtensaoComponent implements OnInit {
  extensoes: Extensao[] = []
  professores: Professor[] = []
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  formAlocacao: FormGroup = this.fb.group({
    professor:['', [Validators.required]],
    extensao: ['', [Validators.required]]
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
        this.professores = professores
      }
    )
    this.alocacao.getExtensoes().subscribe((extensoes)=>
        this.extensoes = extensoes
    )
   }

  submit() {
    const dados = {
      professor:this.formAlocacao.value.professor,
      extensao:this.formAlocacao.value.extensao
    }
    console.log("dados", dados.professor, dados.extensao)

    this.alocacao.atribuirExtensaoAoProf(dados.professor, dados.extensao).subscribe()
    this.openSnackBar()
    this.router.navigateByUrl("/alocacao")
    }

  openSnackBar() {
    this._snackBar.open('Extensão atribuída com sucesso', 'Fechar', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}


