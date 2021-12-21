import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mes } from '../models/Mes';

@Injectable({
  providedIn: 'root'
})
export class MesService {

  url = "api/Meses";

  constructor(private httpClient :HttpClient) { }

  PegarTodos():Observable<Mes[]>{
    return this.httpClient.get<Mes[]>(this.url);
  }
}
