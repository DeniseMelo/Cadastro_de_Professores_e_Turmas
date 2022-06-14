import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsuarioJWT } from 'src/app/auth/models/usuario-jwt';
import { UsuarioService } from 'src/app/services/usuarioJWT.service';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.css']
})
export class NovoUsuarioComponent implements OnInit {

  formCadastro!: FormGroup

  ELEMENTE_DATA: UsuarioJWT ={

    login: '',
    password: ''
  }

  iniciarForm(){
    this.formCadastro = this.fb.group ({
      login: [''],
      password: ['']
   })}


  constructor(
    private usuario: UsuarioService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private route: Router
  ) { }

  ngOnInit(): void {
  }

  submit() {

    this.usuario.cadastrarUsuario(this.ELEMENTE_DATA).subscribe(
      (extensao:any) => {
        console.log(this.formCadastro)
        this.route.navigateByUrl("/bootcamp")
      }
    )
  }

}
