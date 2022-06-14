import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuarioJWT.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  user = localStorage.getItem('login');

  formCadastro: FormGroup = this.fb.group({
    login:['', [Validators.required]],
    password: ['']
  })

  constructor(
    private usuario: UsuarioService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  submit() {
    let dadosUsuario = {
      login:this.formCadastro.value.login,
      password:this.formCadastro.value.password

    }
      this.usuario.cadastrarUsuario(dadosUsuario).subscribe(
        (user:any) => {
          this.formCadastro = user;
          this.router.navigateByUrl(`/${this.user}`)
        }
      )
  }

  sair(){
    this.router.navigateByUrl(`/${this.user}`)
  }

}
