import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import {
  DetalleCompraCreate,
  DetalleCompraResponse,
  DetalleCompraUpdate,
  RespuestaAPI
} from '../../models/detalle_compra.models';

@Injectable({ providedIn: 'root' })
export class DetalleCompraService {

  private readonly base =
    `${environment.apiUrl}/detalle_compra`;

  constructor(
    private readonly http: HttpClient
  ) {}

  list(): Observable<DetalleCompraResponse[]> {

    const params = new HttpParams()
      .set('skip', 0)
      .set('limit', 500);

    return this.http.get<DetalleCompraResponse[]>(
      `${this.base}/`,
      { params }
    );
  }

  get(id: string): Observable<DetalleCompraResponse> {

    return this.http.get<DetalleCompraResponse>(
      `${this.base}/${id}`
    );
  }

  create(
    body: DetalleCompraCreate
  ): Observable<DetalleCompraResponse> {

    return this.http.post<DetalleCompraResponse>(
      `${this.base}/`,
      body
    );
  }

  update(
    id: string,
    body: DetalleCompraUpdate
  ): Observable<DetalleCompraResponse> {

    return this.http.put<DetalleCompraResponse>(
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