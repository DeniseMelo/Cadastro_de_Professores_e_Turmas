import { Professor } from 'src/app/auth/models/professor';
import { ProfessorService } from 'src/app/services/professor.service';
import { MatDialog } from '@angular/material/dialog';
import { Extensao } from './../model/extensao';

import { ExtensaoService } from './../../../../services/extensao.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Status } from '../model/status';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-extensao',
  templateUrl: './edit-extensao.component.html',
  styleUrls: ['./edit-extensao.component.css']
})
export class EditExtensaoComponent implements OnInit {

extensao!:Extensao
element: any;
foto!:File
idExtensao!: number

professores: Professor[] = [ ];


formCadastro: FormGroup = this.fb.group({
    nome:['', [Validators.required, Validators.minLength(4)]],
    especialidade: [''],
    dataInicio: [''],
    dataTermino: [''],
    status: [''],
    professor: ['']

})


 status:Status[]=[
    {value: 'Aberta-0', viewValue: 'Aberta'},
    {value: 'Proxima Turma-1', viewValue: 'Proxima Turma'},
    {value: 'Encerrada-2', viewValue: 'Encerrada'},
]

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private ExtensaoService: ExtensaoService,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    private profServices: ProfessorService,
  ) { }

  ngOnInit(): void {
    const idExtensao: number = parseInt(this.route.snapshot.paramMap.get('idExtensao') || '0')

    this.ExtensaoService.getExtensaoById(idExtensao)
    .subscribe(
      (e) => {
        this.element = e

        this.formCadastro.patchValue({
          nome: this.element.nome,
          especialidade: this.element.especialidade,

        })
      }
    )
    this.profServices.getProfessores100().subscribe(
      (professores) => {
        console.log(professores);
        for(let p of professores){
          this.professores.push(p)
        }
       }
    )
  }

  submit(){
    this.element.nome = this.formCadastro.value.nome


    this.ExtensaoService
    .editarExtensao(this.element)
    .subscribe(
      () => {
        if (this.foto != undefined) {
          const formData = new FormData()

          formData.append('foto', this.foto)

          const filename = `extensao-${this.element.idProfessor}.${this.foto.type.split('/')[1]}`

          this.ExtensaoService.addFoto(this.element.idProfessor || 0, formData, filename)
          .subscribe(
            () => {
              this.formCadastro.reset()
              this.showSuccessMessageAndRedirect()
            },
            (e: HttpErrorResponse) => {
              this.showErrorMessage(e)
            }
          )
        } else {
          this.formCadastro.reset()
          this.showSuccessMessageAndRedirect()
        }
      },
      (e: HttpErrorResponse) => {
        this.showErrorMessage(e)
      }
    )
  }

  fileChange(event: any): void {
    this.foto = event.target.files[0]
  }

  showSuccessMessageAndRedirect(): void {
    this.snackbar.open('Extensão salva!', 'Ok', {
      duration: 3000,
      horizontalPosition: 'left',
      verticalPosition: 'top'
    })

    this.router.navigateByUrl('/extensao')
  }

  showErrorMessage(e: HttpErrorResponse): void {
    this.snackbar.open(`Ocorreu um erro no salvamento! (Erro ${e.status})`, 'Ok', {
      duration: 3000,
      horizontalPosition: 'left',
      verticalPosition: 'top'
    })
  }
}
