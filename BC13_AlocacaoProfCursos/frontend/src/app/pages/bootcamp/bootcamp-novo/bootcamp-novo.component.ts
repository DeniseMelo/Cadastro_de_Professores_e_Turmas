import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Bootcamp } from 'src/app/models/bootcamp';
import { BootcampService } from 'src/app/services/bootcamp.service';


@Component({
  selector: 'app-bootcamp-novo',
  templateUrl: './bootcamp-novo.component.html',
  styleUrls: ['./bootcamp-novo.component.css']
})
export class BootcampNovoComponent implements OnInit {

  selecionarCurso!: FormGroup
  formCadastro!: FormGroup

  listaDeCarreiras = ['ENCERRADA', 'ABERTA', 'PROXIMATURMA']
  listaCursos: Bootcamp[] = []

  selecionaBootcamp!: number;
  selecionaDataTermino!: String;
  selecionaDataInicio!: String;
  dataInicio!: Date;
  dataTermino!: Date;



  constructor(
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private boot: BootcampService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.iniciarForm()
    // this.pegarTodosProfesores()
    this.pegarTodosCursos()
    // this.selectProfessor()

  }


iniciarForm(){
  this.formCadastro = this.fb.group ({
    idTurmaBootcamp: [''],
    nome: ['', [Validators.required, Validators.minLength(3)]],
    carreira: ['', [Validators.required, Validators.minLength(3)]],
    dataInicio: [''],
    dataFim:[''],
    status:['']
 })}


    pegarTodosCursos() {

      this.boot.mostrarTodosCursos().subscribe(
        (lista) => {
        this.listaCursos = lista
        }
      )
    }


    pegarIdBootcamp(){
      this.selecionaBootcamp = this.formCadastro.value.carreira
      console.log(this.selecionaBootcamp)
    }

    chamarCalculoDataInicio(){
      this.selecionaDataTermino = this.formCadastro.value.dataFim;

      this.boot.calculaDataInicio(this.selecionaBootcamp,
        this.selecionaDataTermino).subscribe(
          (dataInicio) => {
            this.dataInicio = dataInicio;
          }
        )

    }

    chamarCalculoDataTermino(){

      this.selecionaDataInicio = this.formCadastro.value.dataInicio

      this.boot.calculaDataTermino(this.selecionaBootcamp,
         this.selecionaDataInicio).subscribe(
           (dataTermino) => {
              this.dataTermino = dataTermino;
           }
         )
    }

    cadastrarNovaTurma(){
      const TURMA = {
        nome: this.formCadastro.value.nome,
        dataInicio: this.formCadastro.value.dataInicio,
        dataTermino: this.dataTermino.toString(),
        carreira: this.formCadastro.value?.carreira,
        status: this.formCadastro.value.status
      }
      this.boot.cadastrarBootcamp(TURMA).subscribe(
        (boot: any) => {
          this.formCadastro = boot;
          console.log(this.formCadastro)
          this.route.navigateByUrl("/bootcamp")
        }
      )
      console.log(TURMA)
      this.boot.cadastrarBootcamp(TURMA)


      this.route.navigateByUrl('/bootcamp');
}
}
