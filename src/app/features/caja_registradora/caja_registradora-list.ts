import { CommonModule } from '@angular/common';

import {
  Component,
  OnInit
} from '@angular/core';

import {
  HttpClient,
  HttpClientModule
} from '@angular/common/http';

import { MatTableModule } from '@angular/material/table';

import { MatButtonModule } from '@angular/material/button';

import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-caja-list',

  standalone: true,

  imports: [
    CommonModule,
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
  ],

  templateUrl: './caja_registradora-list.html',

  styleUrls: ['./caja_registradora-list.scss'],
})

export class CajaRegistradoraListComponent implements OnInit {

  cajas_registradoras: any[] = [];

  displayedColumns: string[] = [
    'id',
    'activo',
    'acciones'
  ];

  apiUrl = 'http://localhost:8000/cajas-registradoras';

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.obtenerCajas();
  }

  obtenerCajas(): void {

    this.http.get<any[]>(`${this.apiUrl}/`)
      .subscribe({

        next: (data) => {
          this.cajas_registradoras = data;
        },

        error: (err) => {
          console.error(err);
        }

      });
  }

  crearCaja(): void {

    this.http.post(
      `${this.apiUrl}/`,
      {}
    )
    .subscribe({

      next: () => {
        this.obtenerCajas();
      },

      error: (err) => {
        console.error(err);
      }

    });
  }

  eliminarCaja(id: string): void {

    this.http.delete(`${this.apiUrl}/${id}`)
      .subscribe({

        next: () => {
          this.obtenerCajas();
        },

        error: (err) => {
          console.error(err);
        }

      });
  }

  activarCaja(id: string): void {

    this.http.put(
      `${this.apiUrl}/${id}/activar`,
      {}
    )
    .subscribe({

      next: () => {
        this.obtenerCajas();
      },

      error: (err) => {
        console.error(err);
      }

    });
  }
}