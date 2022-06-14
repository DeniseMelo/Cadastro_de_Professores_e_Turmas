import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Professor } from '../auth/models/professor';


@Injectable({
    providedIn: 'root'
  })
  export class ProfessorService {

    private readonly baseUrl = 'http://localhost:8080/alocacao/'

    constructor(private http: HttpClient) { }

    getProfessores(): Observable<Professor[]>
    {
        return this.http.get<Professor[]>(`${this.baseUrl}professores`)
    }
    getProfessores100(): Observable<Professor[]>
    {
        return this.http.get<Professor[]>(`${this.baseUrl}professores/totalDisponiveis`)
    }
    getProfessores50(): Observable<Professor[]>
    {
        return this.http.get<Professor[]>(`${this.baseUrl}professores/metadeDisponiveis`)
    }
    getProfessores0(): Observable<Professor[]>
    {
        return this.http.get<Professor[]>(`${this.baseUrl}professores/nadaDisponiveis`)
    }
    getProfessorById(idProf: number): Observable<Professor>
    {
        return this.http.get<Professor>(`${this.baseUrl}/professor/id/${idProf}`)
    }

    getProfessoresPorTurma(idTurmaBootcamp: number): Observable<Professor[]>{
        return this.http.get<Professor[]>(`${this.baseUrl}turmas/${idTurmaBootcamp}/professores`)
    }

    getProfessoresPorExtensao(idExtensao: number): Observable<Professor[]>{
        return this.http.get<Professor[]>(`${this.baseUrl}extensao/${idExtensao}/professores`)
    }
    
} 