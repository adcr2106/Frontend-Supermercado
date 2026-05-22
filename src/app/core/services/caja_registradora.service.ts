import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import {
  CajaRegistradoraResponse,
  RespuestaAPI
} from '../../models/caja_registradora.models';

@Injectable({ providedIn: 'root' })
export class CajaRegistradoraService {

  private readonly base =
    `${environment.apiUrl}/caja_registradora`;

  constructor(
    private readonly http: HttpClient
  ) {}

  list(): Observable<CajaRegistradoraResponse[]> {

    const params = new HttpParams()
      .set('skip', 0)
      .set('limit', 500);

    return this.http.get<CajaRegistradoraResponse[]>(
      `${this.base}/`,
      { params }
    );
  }

  get(id: string): Observable<CajaRegistradoraResponse> {

    return this.http.get<CajaRegistradoraResponse>(
      `${this.base}/${id}`
    );
  }

  create(): Observable<CajaRegistradoraResponse> {

    return this.http.post<CajaRegistradoraResponse>(
      `${this.base}/`,
      {}
    );
  }

  update(id: string): Observable<CajaRegistradoraResponse> {

    return this.http.put<CajaRegistradoraResponse>(
      `${this.base}/${id}`,
      {}
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