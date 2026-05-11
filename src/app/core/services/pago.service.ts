import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import {
  PagoCreate,
  PagoResponse,
  PagoUpdate,
  RespuestaAPI
} from '../../models/pago.models';

@Injectable({ providedIn: 'root' })
export class PagoService {

  private readonly base =
    `${environment.apiUrl}/pagos`;

  constructor(
    private readonly http: HttpClient
  ) {}

  list(): Observable<PagoResponse[]> {

    const params = new HttpParams()
      .set('skip', 0)
      .set('limit', 500);

    return this.http.get<PagoResponse[]>(
      `${this.base}/`,
      { params }
    );
  }

  get(id: string): Observable<PagoResponse> {

    return this.http.get<PagoResponse>(
      `${this.base}/${id}`
    );
  }

  create(
    body: PagoCreate
  ): Observable<PagoResponse> {

    return this.http.post<PagoResponse>(
      `${this.base}/`,
      body
    );
  }

  update(
    id: string,
    body: PagoUpdate
  ): Observable<PagoResponse> {

    return this.http.put<PagoResponse>(
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