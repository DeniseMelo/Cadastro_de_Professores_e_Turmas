import { UsuarioService } from 'src/app/services/usuarioJWT.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioJWT } from 'src/app/auth/models/usuario-jwt';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  user = localStorage.getItem('login');

  loginUsuario!: string | null
  usuario!: UsuarioJWT

  constructor(
    private route: ActivatedRoute,
    private userHttpService: UsuarioService
  ) { }

  ngOnInit(): void {



    this.loginUsuario = this.route.snapshot.paramMap.get('login')

    this.userHttpService.getLogin(`${this.user}`)
    .subscribe(
      (user) => {
        this.usuario = user
      }
    )
  }

}
