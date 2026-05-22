import { HttpClient, HttpParams } from '@angular/common/http';

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import {

  EmpleadoCreate,
  EmpleadoLogin,
  EmpleadoResponse,
  EmpleadoUpdate,
  RespuestaAPI

} from '../../models/empleado.models';

@Injectable({
  providedIn: 'root'
})

export class EmpleadoService {

  private readonly base =
    `${environment.apiUrl}/empleados`;

  constructor(
    private readonly http: HttpClient
  ) {}

  list(): Observable<EmpleadoResponse[]> {

    const params = new HttpParams()
      .set('skip', 0)
      .set('limit', 500);

    return this.http.get<EmpleadoResponse[]>(
      `${this.base}/`,
      { params }
    );
  }

  get(
    id: string
  ): Observable<EmpleadoResponse> {

    return this.http.get<EmpleadoResponse>(
      `${this.base}/${id}`
    );
  }

  getByDocumento(
    documento: string
  ): Observable<EmpleadoResponse> {

    return this.http.get<EmpleadoResponse>(
      `${this.base}/documento/${documento}`
    );
  }

  getByCorreo(
    correo: string
  ): Observable<EmpleadoResponse> {

    return this.http.get<EmpleadoResponse>(
      `${this.base}/correo/${correo}`
    );
  }

  create(
    body: EmpleadoCreate
  ): Observable<EmpleadoResponse> {

    return this.http.post<EmpleadoResponse>(
      `${this.base}/`,
      body
    );
  }

  login(
    body: EmpleadoLogin
  ): Observable<EmpleadoResponse> {

    return this.http.post<EmpleadoResponse>(
      `${this.base}/login`,
      body
    );
  }

  update(
    id: string,
    body: EmpleadoUpdate
  ): Observable<EmpleadoResponse> {

    return this.http.put<EmpleadoResponse>(
      `${this.base}/${id}`,
      body
    );
  }

  delete(
    id: string
  ): Observable<RespuestaAPI> {

    return this.http.delete<RespuestaAPI>(
      `${this.base}/${id}`
    );
  }

  activar(
    id: string
  ): Observable<RespuestaAPI> {

    return this.http.put<RespuestaAPI>(
      `${this.base}/${id}/activar`,
      {}
    );
  }
}