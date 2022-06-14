import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Extensao } from '../pages/extensao/components/model/extensao';

@Injectable({
  providedIn: 'root'
})
export class ExtensaoService {
    idExtensao(idExtensao: any) {
    throw new Error('Method not implemented.');
  }

  private readonly baseURL = 'http://localhost:8080/alocacao/'

  constructor( private http: HttpClient) { }

  getExtensao(): Observable<Extensao[]> {
    return this.http.get<Extensao[]>(this.baseURL+"extensoes")
  }

  getExtensaoById(id: number): Observable<Extensao> {
    return this.http.get<Extensao>(`${this.baseURL}extensao/id/${id}`)
  }

  editarExtensao(extensao: Extensao): Observable<Extensao> {
    return this.http.put<Extensao>(`${this.baseURL}extensao/id/${extensao.idExtensao}`, extensao)
  }

  addFoto(id: number, data: FormData, filename: string): Observable<void> {
    return this.http.post<void>(`${this.baseURL}/envioFoto/${id}?nome=${filename}`, data)
  }

  deleteExtensao(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}extensao/id/${id}`)
  }

  cadastrarExtensao(extensao: Extensao): Observable<Extensao> {
    return this.http.post<Extensao>(`${this.baseURL}extensao`,extensao)
  }

  updateExtensao(extensao: Extensao): Observable<Extensao> {
    return this.http.put<Extensao>(`${this.baseURL}${extensao.idExtensao}`,extensao)
  }


}
