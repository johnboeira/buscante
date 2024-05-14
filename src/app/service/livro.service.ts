import { Item } from './../models/interfaces';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { LivrosResultado } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private readonly API = 'https://www.googleapis.com/books/v1/volumes'
  constructor(private http: HttpClient) { }

  buscar(valorDigitado: string): Observable<Item[]> {
    const params = new HttpParams().append('q', valorDigitado )
    return this.http.get<LivrosResultado>(this.API, { params }).pipe(
      tap((retorno: any) => console.log(retorno)),
      map(retorno => retorno.items),
      tap((retorno: any) => console.log('retorno pós map', retorno)),
    )
  }
}
