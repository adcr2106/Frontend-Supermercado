import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import {
  CategoriaCreate,
  CategoriaResponse,
  CategoriaUpdate,
  RespuestaAPI
} from '../../models/categoria.models';

@Injectable({ providedIn: 'root' })
export class CategoriaService {

  private readonly base =
    `${environment.apiUrl}/categorias`;

  constructor(
    private readonly http: HttpClient
  ) {}

  list(): Observable<CategoriaResponse[]> {

    const params = new HttpParams()
      .set('skip', 0)
      .set('limit', 500);

    return this.http.get<CategoriaResponse[]>(
      `${this.base}/`,
      { params }
    );
  }

  get(id: string): Observable<CategoriaResponse> {

    return this.http.get<CategoriaResponse>(
      `${this.base}/${id}`
    );
  }

  create(
    body: CategoriaCreate
  ): Observable<CategoriaResponse> {

    return this.http.post<CategoriaResponse>(
      `${this.base}/`,
      body
    );
  }

  update(
    id: string,
    body: CategoriaUpdate
  ): Observable<CategoriaResponse> {

    return this.http.put<CategoriaResponse>(
      `${this.base}/${id}`,
      body
    );
  }

  delete(id: string): Observable<RespuestaAPI> {

    return this.http.delete<RespuestaAPI>(
      `${this.base}/${id}`
    );
  }

  activar(id: string): Observable<RespuestaAPI> {

    return this.http.put<RespuestaAPI>(
      `${this.base}/${id}/activar`,
      {}
    );
  }
}