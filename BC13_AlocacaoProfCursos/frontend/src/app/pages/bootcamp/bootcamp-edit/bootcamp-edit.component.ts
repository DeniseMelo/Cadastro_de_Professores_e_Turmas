import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Bootcamp } from 'src/app/models/bootcamp';
import { BootcampService } from 'src/app/services/bootcamp.service';
import { CarreirasService } from 'src/app/services/carreiras.service';
import { Status } from '../../extensao/components/model/status';
import { Boot } from '../boot';

@Component({
  selector: 'app-bootcamp-edit',
  templateUrl: './bootcamp-edit.component.html',
  styleUrls: ['./bootcamp-edit.component.css']
})
export class BootcampEditComponent implements OnInit {

  turma!: Boot
  id!: number
  status: Status[] = [
    {value: 'ABERTA', viewValue: 'Aberta'},
    {value: 'PROXIMATURMA', viewValue: 'Proxima Turma'},
    {value: 'ENCERRADA', viewValue: 'Encerrada'},
  ]
  carreiras!: Bootcamp[]


  formCadastro: FormGroup = this.fb.group ({
    turma: ['', [Validators.required, Validators.minLength(3)]],
    carreira: ['', [Validators.required, Validators.minLength(3)]],
    dataInicio: [''],
    dataFim:[''],
    status:['']
  })



  selecionaBootcamp!: number;
  selecionaDataTermino!: String;
  selecionaDataInicio!: String;
  dataInicio!: Date;
  dataTermino!: Date;


  constructor(
    private fb: FormBuilder,
    private boot: BootcampService,
    private route: Router,
    private router: ActivatedRoute,
    private carreiraService: CarreirasService
  ) { }

  ngOnInit(): void {
    this.id = Number.parseInt(this.router.snapshot.paramMap.get('id') || '0')
    this.boot.buscarIdBootcamp(this.id).subscribe(
      (turma) => {
        this.turma = turma
        let dataInicio = new Date( turma.dataInicio).toLocaleDateString('pt-BR')
        let dataTermino = new Date(turma.dataTermino).toLocaleDateString('pt-BR')
        this.formCadastro.patchValue({
          turma: turma.nome,
          carreira: turma.bootcamp,
          dataInicio: dataInicio.split('/').reverse().join('-'),
          dataTermino: dataTermino.split('/').reverse().join('-'),
          status: turma.status
        })
    })

    this.buscaCarreiras()

    console.log(this.dataInicio)
    console.log(this.dataTermino)
  }


  buscaCarreiras(){
    this.carreiraService.mostrarTodasCarreiras().subscribe(
      (carreiras) => {
          this.carreiras = carreiras
    }
    )
  }


  submit() {

      if(this.dataInicio == undefined){
        const TURMA = {
          nome: this.formCadastro.value.nome,
          dataInicio: this.formCadastro.value.dataInicio,
          dataTermino: this.dataTermino.toString(),
          bootcamp: this.formCadastro.value.carreira,
          status: this.formCadastro.value.status
        }
        console.log(TURMA.dataTermino+'inicio')
        this.boot.editarBootcamp( TURMA).subscribe(
          () => {
            this.route.navigateByUrl("/bootcamp")
          }
        )

      } else if(this.dataTermino == undefined){
        const TURMA = {
          nome: this.formCadastro.value.nome,
          dataInicio: this.dataInicio.toString(),
          dataTermino: this.formCadastro.value.dataTermino,
          bootcamp: this.formCadastro.value.carreira,
          status: this.formCadastro.value.status
        }
        console.log(TURMA.dataInicio+'termino')
        this.boot.editarBootcamp( TURMA).subscribe(
          () => {
            this.route.navigateByUrl("/bootcamp")
          }
        )
      }

    }


    pegarIdBootcamp(){
      this.selecionaBootcamp = this.formCadastro.value.carreira
    }

    chamarCalculoDataInicio(){

      if(this.selecionaBootcamp !== undefined){
        this.selecionaDataTermino = this.formCadastro.value.dataFim;

        this.boot.calculaDataInicio(this.selecionaBootcamp,
          this.selecionaDataTermino).subscribe(
            (dataInicio) => {
              this.dataInicio = dataInicio;
            }
          )
      }

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

}

