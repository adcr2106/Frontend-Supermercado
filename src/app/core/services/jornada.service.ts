import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import {
  JornadaCreate,
  JornadaResponse,
  JornadaUpdate,
  RespuestaAPI
} from '../../models/jornada.models';

@Injectable({ providedIn: 'root' })
export class JornadaService {

  private readonly base =
    `${environment.apiUrl}/jornadas`;

  constructor(
    private readonly http: HttpClient
  ) {}

  list(): Observable<JornadaResponse[]> {

    const params = new HttpParams()
      .set('skip', 0)
      .set('limit', 500);

    return this.http.get<JornadaResponse[]>(
      `${this.base}/`,
      { params }
    );
  }

  get(id: string): Observable<JornadaResponse> {

    return this.http.get<JornadaResponse>(
      `${this.base}/${id}`
    );
  }

  create(
    body: JornadaCreate
  ): Observable<JornadaResponse> {

    return this.http.post<JornadaResponse>(
      `${this.base}/`,
      body
    );
  }

  update(
    id: string,
    body: JornadaUpdate
  ): Observable<JornadaResponse> {

    return this.http.put<JornadaResponse>(
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