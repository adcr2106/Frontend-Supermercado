import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import {
  ProductoCreate,
  ProductoResponse,
  ProductoUpdate,
  RespuestaAPI
} from '../../models/producto.models';

@Injectable({ providedIn: 'root' })
export class ProductoService {

  private readonly base =
    `${environment.apiUrl}/productos`;

  constructor(
    private readonly http: HttpClient
  ) {}

  list(): Observable<ProductoResponse[]> {

    const params = new HttpParams()
      .set('skip', 0)
      .set('limit', 500);

    return this.http.get<ProductoResponse[]>(
      `${this.base}/`,
      { params }
    );
  }

  get(id: string): Observable<ProductoResponse> {

    return this.http.get<ProductoResponse>(
      `${this.base}/${id}`
    );
  }

  create(
    body: ProductoCreate
  ): Observable<ProductoResponse> {

    return this.http.post<ProductoResponse>(
      `${this.base}/`,
      body
    );
  }

  update(
    id: string,
    body: ProductoUpdate
  ): Observable<ProductoResponse> {

    return this.http.put<ProductoResponse>(
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