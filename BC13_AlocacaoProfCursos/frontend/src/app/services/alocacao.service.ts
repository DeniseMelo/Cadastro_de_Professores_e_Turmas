import { TurmaBootcamp } from './../models/turmaBootcamp';
import { Professor } from 'src/app/auth/models/professor';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Extensao } from '../pages/extensao/components/model/extensao';



@Injectable({
  providedIn: 'root'
})
export class AlocacaoService {

    private readonly baseUrl = 'http://localhost:8080/alocacao'

constructor(private http: HttpClient) { }

  atribuirExtensaoAoProf(idProfessor: number, idExtensao: number): Observable<Professor> {
    console.log("chegou na requisiçao")
    console.log("prof:", idProfessor, "ext", idExtensao )
    return this.http.post<Professor>(`${this.baseUrl}/atribuirExtensao/professor/${idProfessor}/extensao/${idExtensao}`, null);
  }

  atribuirTurmaAoProf(idProfessor: number, idTurma: number): Observable<Professor> {
    return this.http.post<Professor>(`${this.baseUrl}/atribuirTurma/professor/${idProfessor}/turma/${idTurma}`, null);
  }

  getExtensoes(): Observable<Extensao[]> {

    return this.http.get<Extensao[]>(`${this.baseUrl}/extensoes`);
  }
  getTurmas(): Observable<TurmaBootcamp[]> {
    return this.http.get<TurmaBootcamp[]>(`${this.baseUrl}/turmas`);
  }
  getProfessores(): Observable<Professor[]>{
    return this.http.get<Professor[]>(`${this.baseUrl}/professores`);
  }
  getProfessores100(): Observable<Professor[]>
  {
      return this.http.get<Professor[]>(`${this.baseUrl}/professores/totalDisponiveis`)
  }
  getProfessores50(): Observable<Professor[]>
  {
      return this.http.get<Professor[]>(`${this.baseUrl}/professores/metadeDisponiveis`)
  }
}