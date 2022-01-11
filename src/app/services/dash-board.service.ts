import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class DashBoardService {

  apiUrl = "api/Dashboard";

  constructor(private httpClient: HttpClient) { }

  PegarDadosCardsDashboard(usuarioId:string):Observable<any>{
    const url = `${this.apiUrl}/PegarDadosCardsDashboard/${usuarioId}`
    return this.httpClient.get<any>(url);
  }

  PegarDadosAnuaisPeloUsuarioId(usuarioId:string,ano:number){
    const apiUrl = `${this.apiUrl}/PegarDadosAnuaisPeloUsuarioId/${usuarioId}/${ano}`
    return this.httpClient.get<any>(apiUrl);
  }
}
