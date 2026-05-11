import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import {
  ClienteCreate,
  ClienteResponse,
  ClienteUpdate,
  RespuestaAPI
} from '../../models/cliente.models';

@Injectable({ providedIn: 'root' })
export class ClienteService {

  private readonly base =
    `${environment.apiUrl}/clientes`;

  constructor(
    private readonly http: HttpClient
  ) {}

  list(): Observable<ClienteResponse[]> {

    const params = new HttpParams()
      .set('skip', 0)
      .set('limit', 500);

    return this.http.get<ClienteResponse[]>(
      `${this.base}/`,
      { params }
    );
  }

  get(id: string): Observable<ClienteResponse> {

    return this.http.get<ClienteResponse>(
      `${this.base}/${id}`
    );
  }

  create(
    body: ClienteCreate
  ): Observable<ClienteResponse> {

    return this.http.post<ClienteResponse>(
      `${this.base}/`,
      body
    );
  }

  update(
    id: string,
    body: ClienteUpdate
  ): Observable<ClienteResponse> {

    return this.http.put<ClienteResponse>(
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