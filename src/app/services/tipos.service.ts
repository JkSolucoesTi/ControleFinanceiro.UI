import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tipo } from '../models/Tipo';

@Injectable({
  providedIn: 'root'
})
export class TiposService {

  private url : string = 'api/Tipos';

  constructor(private httpClient:HttpClient) { }

  PegarTodos() : Observable<Tipo[]>
  {
    return this.httpClient.get<Tipo[]>(this.url);
  }

}
