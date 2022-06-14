import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HABILIDADESTECNICAS } from '../models/habilidadeTecnicas';

@Injectable({
  providedIn: 'root'
})
export class HabilidadesService {

  private readonly baseUrl = 'http://localhost:8080/alocacao'


  constructor(
    private http: HttpClient
  ) { }

  mostraTodasHbilidades(): Observable<HABILIDADESTECNICAS[]> {
    return this.http.get<HABILIDADESTECNICAS[]>(`${this.baseUrl}/habilidadeTecnica`)
  }
}
