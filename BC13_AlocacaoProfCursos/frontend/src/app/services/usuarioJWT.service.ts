import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { UsuarioJWT } from "../auth/models/usuario-jwt"

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  idUsuario(idExtensao: any) {
    throw new Error('Method not implemented.');
  }

  private readonly baseUrl = 'http://localhost:8080/alocacao/'

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<UsuarioJWT[]> {
      return this.http.get<UsuarioJWT[]>(`${this.baseUrl}usuario`)
  }

  deleteUsuario(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}usuario/id/${id}`)
  }
  cadastrarUsuario(usuario: UsuarioJWT):  Observable<UsuarioJWT> {
    return this.http.post<UsuarioJWT>(`${this.baseUrl}usuario`,usuario)
  }
  getLogin(login: string): Observable<UsuarioJWT> {
    return this.http.get<UsuarioJWT>(`${this.baseUrl}usuario/login/${login}`)
  }
}