import { DadosRegistro } from './../models/DadosRegistro';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
    const apiUrl = `${this.url}/RegistrarUsuario`;
    return this.httpClient.post<DadosRegistro>(apiUrl,dadosRegistros,httpOptions);
  }

}
