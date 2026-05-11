import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import {
  ProveedorCreate,
  ProveedorResponse,
  ProveedorUpdate,
  RespuestaAPI
} from '../../models/proveedor.models';

@Injectable({ providedIn: 'root' })
export class ProveedorService {

  private readonly base =
    `${environment.apiUrl}/proveedores`;

  constructor(
    private readonly http: HttpClient
  ) {}

  list(): Observable<ProveedorResponse[]> {

    const params = new HttpParams()
      .set('skip', 0)
      .set('limit', 500);

    return this.http.get<ProveedorResponse[]>(
      `${this.base}/`,
      { params }
    );
  }

  get(id: string): Observable<ProveedorResponse> {

    return this.http.get<ProveedorResponse>(
      `${this.base}/${id}`
    );
  }

  create(
    body: ProveedorCreate
  ): Observable<ProveedorResponse> {

    return this.http.post<ProveedorResponse>(
      `${this.base}/`,
      body
    );
  }

  update(
    id: string,
    body: ProveedorUpdate
  ): Observable<ProveedorResponse> {

    return this.http.put<ProveedorResponse>(
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