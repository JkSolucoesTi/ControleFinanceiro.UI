import { funcao } from './../models/funcao';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type':'application/json',
    'Authorization':`Bearer ${localStorage.getItem('tokenUsuarioLogado')}`
  })
}

@Injectable({
  providedIn: 'root'
})
export class FuncoesService {

  url = 'api/Funcoes';

  constructor(private httpClient : HttpClient) { }


  PegarTodos(): Observable<funcao[]>
  {
    return this.httpClient.get<funcao[]>(this.url);
  }

  PegarPeloId(funcaoId:string):Observable<funcao>
  {
    return this.httpClient.get<funcao>(`${this.url}/${funcaoId}`);

  }

  NovaFuncao(funcao:funcao):Observable<any>
  {
    return this.httpClient.post<funcao>(this.url,funcao,httpOptions);
  }

  AtualizarFuncao(funcaoId:string,funcao:funcao):Observable<any>
  {
    return this.httpClient.put<any>(`${this.url}/${funcaoId}`,funcao,httpOptions);
  }

  ExcluirFuncao(funcaoId:string):Observable<any>
  {
    return this.httpClient.delete<any>(`${this.url}/${funcaoId}`,httpOptions);
  }

  FiltrarFuncao(nomeFuncao: string):Observable<funcao[]>
  {
    return this.httpClient.get<funcao[]>(`${this.url}/FiltrarFuncoes/${nomeFuncao}`);
  }
}
