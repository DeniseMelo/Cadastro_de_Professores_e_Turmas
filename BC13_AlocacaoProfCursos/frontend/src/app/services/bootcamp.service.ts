import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bootcamp }  from '../models/bootcamp';
import { Boot } from '../pages/bootcamp/boot';
import { Professores } from '../pages/bootcamp/professores';


@Injectable({
  providedIn: 'root'
})
export class BootcampService {

    private readonly baseUrl = 'http://localhost:8080/alocacao'

constructor(private http: HttpClient) { }

  buscarIdBootcamp(id: any): Observable<Boot> {
    return this.http.get<Boot>(`${this.baseUrl}/turmaBootcamp/id/${id}`);
  }

  mostrarTodosBootcamps(): Observable<Boot[]> {
    return this.http.get<Boot[]>(`${this.baseUrl}/turmas`);
  }

  mostrarTodosProfessores(): Observable<Professores[]> {
    return this.http.get<Professores[]>(`${this.baseUrl}/professor`);
  }

  mostrarTodosCursos(): Observable<Bootcamp[]> {
    return this.http.get<Bootcamp[]>(`${this.baseUrl}/bootcamp`);
  }

  cadastrarBootcamp(bootcamp: Boot): Observable<Boot> {
    return this.http.post<Boot>(`http://localhost:8080/alocacao/novaTurmaBootcamp`, bootcamp);
  }

  inserirBootcamp(bootcamp:Bootcamp): Observable<Bootcamp> {
    return this.http.post<Bootcamp>(`${this.baseUrl}/bootcamp`, bootcamp);
  }

  editarBootcamp(bootcamp: Boot ): Observable<Boot> {
    return this.http.put<Boot>(`http://localhost:8080/alocacao/turmaBootcamp/id/${bootcamp.idTurmaBootcamp}`, bootcamp);
  }

  excluirBootcamp(id: any): Observable<Boot> {
    return this.http.delete<Boot>(`${this.baseUrl}/turmaBootcamp/id/${id}`);
  }

  calculaDataInicio(idBootcamp: number, dataTermino: String): Observable<any> {
    return this.http.get(`${this.baseUrl}/turmaBootcamp/${idBootcamp}/CalculaDataInicio?dataTermino=${dataTermino}`)
  }

  calculaDataTermino(idBootcamp: number, dataInicio: String): Observable<any> {
    return this.http.get(`${this.baseUrl}/turmaBootcamp/${idBootcamp}/CalculaDataTermino?dataInicio=${dataInicio}`)
  }



}