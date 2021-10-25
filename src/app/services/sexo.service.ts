import { Sexo } from './../models/Sexo';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SexoService {

  uri = 'api/Sexo'

  constructor(private httpClient : HttpClient) {}

  PegarTodos(): Observable<Sexo[]>
  {
    return this.httpClient.get<Sexo[]>(this.uri);
  }
}
