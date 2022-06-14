import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Bootcamp } from 'src/app/models/bootcamp';
import { HABILIDADESTECNICAS } from 'src/app/models/habilidadeTecnicas';
import { CarreirasService } from 'src/app/services/carreiras.service';
import { HabilidadesService } from 'src/app/services/habilidades.service';
import { ProfessorHttpService } from '../services/professor-http.service';

@Component({
  selector: 'app-cadastro-professor',
  templateUrl: './cadastro-professor.component.html',
  styleUrls: ['./cadastro-professor.component.css']
})
export class CadastroProfessorComponent implements OnInit {

  habilidadesTecnicas: HABILIDADESTECNICAS[] = [];
  carreiras: Bootcamp[] = [];

  @ViewChild('fileInput')
  fileInput!: ElementRef

  professor: FormGroup = this.fb.group({
    nome: ['',[ Validators.required ]],
    email: ['', [ Validators.required, Validators.email ]],
    habilidadeTecnica: ['', [ Validators.required ]],
    carreira: ['', [ Validators.required ]],
  })

  foto!: File

  constructor(
    private fb: FormBuilder,
    private funHttpService: ProfessorHttpService,
    private snackbar: MatSnackBar,
    private router: Router,
    private habilidadeService: HabilidadesService,
    private carreiraService: CarreirasService
  ) { }

  ngOnInit(): void {

    this.habilidadeService.mostraTodasHbilidades().subscribe(
      (habilidades) => {
          for(let h of habilidades){
            this.habilidadesTecnicas.push(h)
          }
      }
    )

    this.carreiraService.mostrarTodasCarreiras().subscribe(
      (carreiras) => {
        for(let c of carreiras ){
          this.carreiras.push(c)
        }
      }
    )

  }


  selectImage(): void {
    this.fileInput.nativeElement.click()
  }

  submit(): void {
    const PROFESSOR = {
      nome: this.professor.value.nome,
      email: this.professor.value.email,
      habilidadesTecnicas:  this.professor.value.habilidadeTecnica,
      bootcamp: this.professor.value.carreira,
    }

    this.funHttpService
    .inserirProfessor(PROFESSOR)
    .subscribe(
      (fun) => {
        if (this.foto != undefined) {
          const formData: FormData = new FormData()

          formData.append('foto', new Blob([this.foto], { type: this.foto.type }))

          const filename = `professor-${fun.idProfessor}.${this.foto.type.split('/')[1]}`

          this.funHttpService.addFoto(fun.idProfessor || 0, formData, filename)
          .subscribe(
            () => {
              this.professor.reset()
              this.showSuccessMessageAndRedirect()
            },
            (e: HttpErrorResponse) => {
              this.showErrorMessage(e)
            }
          )
        } else {
          this.professor.reset()
          this.showSuccessMessageAndRedirect()
        }
      },
      (e: HttpErrorResponse) => {
        this.showErrorMessage(e)
      }
    )



  }

  fileChange(event: any) {
    this.foto = event.target.files[0]
  }

  showSuccessMessageAndRedirect(): void {
    this.snackbar.open('Professor salvo!', 'Ok', {
      duration: 3000,
      horizontalPosition: 'left',
      verticalPosition: 'top'
    })

    this.router.navigateByUrl('/professor')
  }

  showErrorMessage(e: HttpErrorResponse): void {
    this.snackbar.open(`Ocorreu um erro no salvamento! (Erro ${e.status})`, 'Ok', {
      duration: 3000,
      horizontalPosition: 'left',
      verticalPosition: 'top'
    })
  }
}

