import { Cartao } from './../models/Cartao';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const HttpOptions = {
  headers : new HttpHeaders({
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("tokenUsuarioLogado")}`
  })
};

@Injectable({
  providedIn: 'root'
})
export class CartoesService {

  api = "api/Cartoes";

  constructor(private cartoesService:HttpClient) { }

  PegarCartoesPeloId(cartaoId :number):Observable<Cartao>{
    const apiUrl = `${this.api}/${cartaoId}`;
    return this.cartoesService.get<Cartao>(apiUrl);
  }

  PegarCartoesPeloUsuarioId(cadastroId: string):Observable<Cartao[]>{
    const apiUrl = `${this.api}/PegarCartoesPeloUsuarioId/${cadastroId}`;
    return this.cartoesService.get<Cartao[]>(apiUrl);
  }

  NovoCartao(cartao: Cartao):Observable<any>{
    return this.cartoesService.post<Cartao>(this.api,cartao,HttpOptions);
  }

  AtualizarCartao(cartaoId:number,cartao:Cartao):Observable<any>{
    const apiUrl = `${this.api}/${cartaoId}`;
    return this.cartoesService.put<any>(apiUrl,cartao,HttpOptions);
  }

  ExcluirCartao(cartaoId : string):Observable<any>{
    const apiUrl = `${this.api}/${cartaoId}`;
    return this.cartoesService.delete<number>(apiUrl,HttpOptions);
  }

  FiltrarCartoes(numeroCartao:string):Observable<Cartao[]>{
    const apiUrl = `${this.api}/FiltrarCartoes/${numeroCartao}`;
    return this.cartoesService.get<Cartao[]>(apiUrl);
  }
}
