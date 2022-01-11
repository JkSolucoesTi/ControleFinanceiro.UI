import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Despesa } from '../models/Despesa';

const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type':'application/json',
    'Authorization':`Bearer ${localStorage.getItem('tokenUsuarioLogado')}`
  })
}



@Injectable({
  providedIn: 'root'
})
export class DespesasService {


  url = "api/Despesas";

  constructor(private httpClient : HttpClient) { }

  PegarDespesasPeloUsuarioId(usuarioId:string): Observable<Despesa[]>{
    const urlApi = `${this.url}/PegarDespesasPeloUsuarioId/${usuarioId}`;
    return this.httpClient.get<Despesa[]>(urlApi,httpOptions);
  }

  PegarDespesaPeloId(despesaId:number):Observable<Despesa>{
    const urlApi = `${this.url}/PegarDespesasPeloId/${despesaId}`;
    return this.httpClient.get<Despesa>(urlApi,httpOptions);
  }

  NovaDespesa(despesa:Despesa):Observable<any>{
    return this.httpClient.post<Despesa>(this.url,despesa,httpOptions);
  }

  AtualizarDespesa(despesaId:number, despesa : Despesa):Observable<any>{
    const urlApi = `${this.url}/${despesaId}`;
    return this.httpClient.put(urlApi,despesa,httpOptions);
  }

  ExcluirDespesa(despesaId:number):Observable<any>{
    const urlApi = `${this.url}/${despesaId}`;
    return this.httpClient.delete<any>(urlApi,httpOptions);
  }

  FiltrarDespesas(nomeCategoria:string):Observable<Despesa[]>{
    const apiUrl = `${this.url}/FiltrarDespesas/${nomeCategoria}`;
    return this.httpClient.get<Despesa[]>(apiUrl);

  }

}
