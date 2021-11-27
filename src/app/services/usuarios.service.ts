import { DadosRegistro } from './../models/DadosRegistro';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DadosLogin } from '../models/DadosLogin';

const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type':'application/json'
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

}
