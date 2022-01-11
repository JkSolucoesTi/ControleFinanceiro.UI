import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ganho } from '../models/Ganho';

const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type' : "application/json",
    'Authorization': `Bearer ${localStorage.getItem('tokenUsuarioLogado')}`
  })
}


@Injectable({
  providedIn: 'root'
})
export class GanhosService {

  url = "api/ganhos"

  constructor(private httpClient : HttpClient) { }

  PegarGanhosPeloUsuarioId(usuarioId:string):Observable<Ganho[]>{
    const apiUrl = `${this.url}/PegarGanhosPeloUsuarioId/${usuarioId}`;
    return this.httpClient.get<Ganho[]>(apiUrl,httpOptions);
  }

  PegarGanhoPeloId(usuarioId:string):Observable<Ganho>{
    const apiUrl = `${this.url}/${usuarioId}`;
    return this.httpClient.get<Ganho>(apiUrl);
  }

  NovoGanho(ganho:Ganho):Observable<any>{
    return this.httpClient.post<Ganho>(this.url,ganho,httpOptions);
  }

  AtualizarGanho(ganhoId:string,ganho:Ganho):Observable<any>
  {
    const apiUrl = `${this.url}/${ganhoId}`
    return this.httpClient.put<Ganho>(apiUrl,ganho,httpOptions);
  }

  ExcluirGanho(ganhoId:string):Observable<any>{
    const apiUrl = `${this.url}/${ganhoId}`
    return this.httpClient.delete<Ganho>(apiUrl,httpOptions);
  }

  FiltrarGanhos(nomeCategoria:string):Observable<Ganho[]>{
    const apiUrl = `${this.url}/FiltrarGanhos/${nomeCategoria}`;
    return this.httpClient.get<Ganho[]>(apiUrl,httpOptions);
  }

}
