import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Professor } from 'src/app/auth/models/professor';
import { ProfessorService } from 'src/app/services/professor.service';

import { Status } from '../model/status';
import { ExtensaoService } from './../../../../services/extensao.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

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
    {value: 'ABERTA', viewValue: 'Aberta'},
    {value: 'PROXIMATURMA', viewValue: 'Proxima Turma'},
    {value: 'ENCERRADA', viewValue: 'Encerrada'},
]

constructor(
    private extensao: ExtensaoService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private profServices: ProfessorService,
    private router: Router
    ) { }

  ngOnInit(): void {

    this.profServices.getProfessores100().subscribe(
      (professores) => {
        console.log(professores);
        for(let p of professores){
          this.professores.push(p)
        }
       }
    )

  }

  submit() {
    const dadosExtensao = {
      nome:this.formCadastro.value.nome,
      especialidade:this.formCadastro.value.especialidade,
      dataInicio: this.formCadastro.value.dataInicio,
      dataTermino:this.formCadastro.value.dataTermino,
      professor: this.formCadastro.value.professor,
      status:this.formCadastro.value.status
    }
      this.extensao.cadastrarExtensao(dadosExtensao).subscribe(
        (extensao:any) => {
          this.formCadastro = extensao;
          console.log(this.formCadastro)
          this.router.navigateByUrl("/extensao")
        }
      )


    console.log(dadosExtensao)
      this.extensao.cadastrarExtensao(dadosExtensao)


      this.router.navigateByUrl('/extensao');
    }

  }


