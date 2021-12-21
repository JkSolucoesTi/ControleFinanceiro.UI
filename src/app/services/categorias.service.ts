import { Categoria } from './../models/Categoria';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers : new HttpHeaders(
    {
      'Content-Type':'application/json'
    }
  )
};

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  url = 'api/Categorias'


  constructor(private httpClient: HttpClient) { }


  PegarTodos():Observable<Categoria[]>
  {
    return this.httpClient.get<Categoria[]>(this.url);
  }

  PegarCategoriaPeloId(categoriaId : number) : Observable<Categoria>
  {
    const apiUrl = `${this.url}/${categoriaId}`;
    return this.httpClient.get<Categoria>(apiUrl);
  }

  NovaCategoria(categoria:Categoria) : Observable<Categoria>
  {
    return this.httpClient.post<Categoria>(this.url,categoria, httpOptions);
  }

  AtualizarCategoria(categoriaId: number , categoria:Categoria): Observable<any>
  {
    const apiUrl = `${this.url}/${categoriaId}`;
    return this.httpClient.put<Categoria>(apiUrl,categoria,httpOptions);
  }

  ExcluirCategoria(categoriaId : number): Observable<any>
  {
    const apiUrl = `${this.url}/${categoriaId}`;
    return this.httpClient.delete<any>(apiUrl);
  }

  FiltrarCategoria(nomeCategoria : string) : Observable<Categoria[]>
  {
    const apiUrl = `${this.url}/FiltrarCategoria/${nomeCategoria}`;
    return this.httpClient.get<Categoria[]>(apiUrl);
  }

  FiltrarCategoriasDepesas() : Observable<Categoria[]>
  {
    const apiUrl = `${this.url}/FiltrarCategoriasDepesas/`;
    return this.httpClient.get<Categoria[]>(apiUrl);
  }
}
