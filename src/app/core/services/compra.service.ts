import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import {
  CompraCreate,
  CompraResponse,
  CompraUpdate,
  RespuestaAPI
} from '../../models/compra.models';

@Injectable({ providedIn: 'root' })
export class CompraService {

  private readonly base =
    `${environment.apiUrl}/compras`;

  constructor(
    private readonly http: HttpClient
  ) {}

  list(): Observable<CompraResponse[]> {

    const params = new HttpParams()
      .set('skip', 0)
      .set('limit', 500);

    return this.http.get<CompraResponse[]>(
      `${this.base}/`,
      { params }
    );
  }

  get(id: string): Observable<CompraResponse> {

    return this.http.get<CompraResponse>(
      `${this.base}/${id}`
    );
  }

  create(
    body: CompraCreate
  ): Observable<CompraResponse> {

    return this.http.post<CompraResponse>(
      `${this.base}/`,
      body
    );
  }

  update(
    id: string,
    body: CompraUpdate
  ): Observable<CompraResponse> {

    return this.http.put<CompraResponse>(
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