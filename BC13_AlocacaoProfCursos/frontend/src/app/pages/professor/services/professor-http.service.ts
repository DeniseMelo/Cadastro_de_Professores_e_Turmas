import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Professor } from "../professor";

@Injectable({
    providedIn: 'root'
  })

  
export class ProfessorHttpService {

    private readonly baseURL = 'http://localhost:8080/alocacao/'

    constructor(
        private http: HttpClient
      ) {}

      mostrarTodosProfessores(): Observable<Professor[]> {
        return this.http.get<Professor[]>(`${this.baseURL}professores`)
      }
    
      buscarIdProfessor(id: number): Observable<Professor> {
        return this.http.get<Professor>(`${this.baseURL}professor/id/${id}`)
      }

      buscarNomeProfessor(nome: String): Observable<Professor>{
        return this.http.get<Professor>(`${this.baseURL}professor/nome/${nome}`)
      }

      buscarEmailProfessor(email: String): Observable<Professor> {
        return this.http.get<Professor>(`${this.baseURL}professor/email/${email}`)
      }
    
      excluirProfessor(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseURL}professor/id/${id}`)
      }
    
      inserirProfessor(professor: Professor): Observable<Professor> {
        return this.http.post<Professor>(`${this.baseURL}professor`, professor)
      }
    
      addFoto(id: number, data: FormData, filename: string): Observable<void> {
        return this.http.post<void>(`${this.baseURL}/envioFoto/${id}?nome=${filename}`, data)
      }
    
      editarProfessor(professor: Professor): Observable<Professor> {
        return this.http.put<Professor>(`${this.baseURL}professor/id/${professor.idProfessor}`, professor)
      }

}