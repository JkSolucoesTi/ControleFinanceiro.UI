import { DadosRegistro } from './../models/DadosRegistro';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DadosLogin } from '../models/DadosLogin';
import { AtualizarUsuario } from '../models/AtualizarUsuario';

const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type':'application/json'
  })
}

const httpOptions2 = {
  headers : new HttpHeaders({
    'Content-Type':'application/json',
    'Authorization': `Bearer ${localStorage.getItem('tokenUsuarioLogado')}`
  })
}


@Injectable({
  providedIn: 'root'
})

export class UsuariosService {

  url='api/Usuarios'

  constructor(private httpClient : HttpClient) { }

  SalvarFoto(formData:any):Observable<any>{
    const apiUrl=`${this.url}/SalvarFoto`;
    return this.httpClient.post<any>(apiUrl,formData);
  }

  RegistrarUsuario(dadosRegistros :DadosRegistro): Observable<any>{
    const apiUrl = `${this.url}`;
    return this.httpClient.post<DadosRegistro>(apiUrl,dadosRegistros,httpOptions);
  }

  LogarUsuario(dadosLogin: DadosLogin):Observable<any>{
    const apiUrl = `${this.url}/LogarUsuario`;
    return this.httpClient.post<DadosLogin>(apiUrl,dadosLogin);
  }

  RetornarFotoUsuario(id:string): Observable<any>{
    const apiUrl = `${this.url}/RetornarFotoUsuario/${id}`;
    return this.httpClient.get<any>(apiUrl);
  }

  PegarUsuarioPeloId(id:string): Observable<AtualizarUsuario>
  {
    const apiUrl = `${this.url}/${id}`;
    return this.httpClient.get<AtualizarUsuario>(apiUrl);
  }

  AtualizarUsuario(atualizarUsuario: AtualizarUsuario): Observable<any>
  {
    const apiUrl = `${this.url}/AtualizarUsuario/${atualizarUsuario}`;
    console.log(apiUrl);
    console.log(atualizarUsuario);
    return this.httpClient.put<AtualizarUsuario>(apiUrl,atualizarUsuario,httpOptions2);
  }


}
