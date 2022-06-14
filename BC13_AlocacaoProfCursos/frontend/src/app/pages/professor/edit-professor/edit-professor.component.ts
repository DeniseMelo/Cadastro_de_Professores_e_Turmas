import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { HABILIDADESTECNICAS } from 'src/app/models/habilidadeTecnicas';
import { CarreirasService } from 'src/app/services/carreiras.service';
import { HabilidadesService } from 'src/app/services/habilidades.service';
import { Bootcamp } from '../../bootcamp/bootcamps';
import { Professor } from '../professor';
import { ProfessorHttpService } from '../services/professor-http.service';

@Component({
  selector: 'app-edit-professor',
  templateUrl: './edit-professor.component.html',
  styleUrls: ['./edit-professor.component.css']
})
export class EditProfessorComponent implements OnInit {

  professor!: Professor
  carreiras!: Bootcamp[]
  habilidadesTecnicas!: HABILIDADESTECNICAS[]


  formEdit: FormGroup = this.fb.group({
    nome: ['', [ Validators.required ]],
    email: ['', [ Validators.required, Validators.email ]],
    habilidadeTecnica: ['', [ Validators.required ]],
    carreira: ['', [ Validators.required ]],
    foto: ['']
  })

  foto!: File

  constructor(
    private route: ActivatedRoute,
    private funHttpService: ProfessorHttpService,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private router: Router,
    private carreiraService: CarreirasService,
    private habilidadeService: HabilidadesService
  ) { }

  ngOnInit(): void {
    const id: number = parseInt(this.route.snapshot.paramMap.get('idProfessor') || '0')

    this.funHttpService.buscarIdProfessor(id)
    .subscribe(
      (f) => {
        this.professor = f

        this.formEdit.patchValue({
          nome: this.professor.nome,
          email: this.professor.email,
          habilidadeTecnica: this.professor.habilidadeTecnica,
          carreira: this.professor.bootcamp?.nome

        })
      }
    )

    this.buscaCarreiras();
    this.buscaTodasHabilidades();
  }

  buscaCarreiras(): void {
    this.carreiraService.mostrarTodasCarreiras().subscribe(
      (carreiras) => {
          this.carreiras = carreiras
      }
    )
  }

  buscaTodasHabilidades(): void {
    this.habilidadeService.mostraTodasHbilidades().subscribe(
      (habilidades) => {
        this.habilidadesTecnicas = habilidades
      }
    )
  }

  submit(): void {
    this.professor.nome = this.formEdit.value.nome
    this.professor.email = this.formEdit.value.email

    this.funHttpService
    .editarProfessor(this.professor)
    .subscribe(
      () => {
        if (this.foto != undefined) {
          const formData = new FormData()

          formData.append('foto', this.foto)

          const filename = `professor-${this.professor.idProfessor}.${this.foto.type.split('/')[1]}`

          this.funHttpService.addFoto(this.professor.idProfessor || 0, formData, filename)
          .subscribe(
            () => {
              this.formEdit.reset()
              this.showSuccessMessageAndRedirect()
            },
            (e: HttpErrorResponse) => {
              this.showErrorMessage(e)
            }
          )
        } else {
          this.formEdit.reset()
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
