import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bootcamp } from '../models/bootcamp';

@Injectable({
  providedIn: 'root'
})
export class CarreirasService {

  private readonly baseUrl = 'http://localhost:8080/alocacao'

  constructor(
    private http: HttpClient
  ) { }

  mostrarTodasCarreiras(): Observable<Bootcamp[]> {
    return this.http.get<Bootcamp[]>(`${this.baseUrl}/bootcamp`)
  }

}
