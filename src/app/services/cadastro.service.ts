import { Injectable } from '@angular/core';
import { Cadastro } from './../models/Cadastro';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PegarTokenUsuario } from '../app.module';
/*Configuração do envio de informações no rest post*/
const httpOptions = {
  headers : new HttpHeaders(
    {
      'Content-Type':'application/json',
      'Authorization':`Bearer ${localStorage.getItem('tokenUsuarioLogado')}}`
    }
  )
};

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  url = 'api/Cadastro';

constructor(private httpClient : HttpClient) { }

NovoCadastro(cadastro: Cadastro): Observable<any>
{
  return this.httpClient.post<any>(this.url,cadastro,httpOptions);
}

PegarTodos(): Observable<Cadastro[]>
{
  console.log(localStorage.getItem('tokenUsuarioLogado'));
  return this.httpClient.get<Cadastro[]>(this.url);
}

PegarPorId(cadastroId : number):Observable<Cadastro>
{
  const rota = `${this.url}/PegarPorId/${cadastroId}`;
  return this.httpClient.get<Cadastro>(rota);
}

AtualizarCadastro(cadastroId:number, cadastro:Cadastro): Observable<Cadastro>
{
  const apiUrl = `${this.url}/${cadastroId}`;
  return this.httpClient.put<any>(apiUrl,cadastro,httpOptions);
}

ExcluirCadastro(cadastroId:any):Observable<any>
{
  const rota = `${this.url}/${cadastroId}`
 return  this.httpClient.delete<any>(rota);
}

}
