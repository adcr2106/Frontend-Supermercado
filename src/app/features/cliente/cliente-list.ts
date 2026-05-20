import { CommonModule } from '@angular/common';

import { Component, OnInit } from '@angular/core';

import {
  HttpClient,
  HttpClientModule
} from '@angular/common/http';

import {
  MatDialog,
  MatDialogModule
} from '@angular/material/dialog';

import { MatTableModule } from '@angular/material/table';

import { MatButtonModule } from '@angular/material/button';

import { MatIconModule } from '@angular/material/icon';

import { ClienteDialogComponent } from './cliente-dialog';

@Component({
  selector: 'app-cliente-list',

  standalone: true,

  imports: [
    CommonModule,
    HttpClientModule,
    MatDialogModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
  ],

  templateUrl: './cliente-list.html',

  styleUrls: ['./cliente-list.scss'],
})

export class ClienteListComponent implements OnInit {

  clientes: any[] = [];

  displayedColumns: string[] = [
    'documento',
    'nombre',
    'telefono',
    'correo',
    'activo',
    'acciones'
  ];

  apiUrl = 'http://localhost:8000/clientes';

  constructor(
    private http: HttpClient,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.obtenerClientes();
  }

  obtenerClientes(): void {

    this.http.get<any[]>(`${this.apiUrl}/`)
      .subscribe({

        next: (data) => {
          this.clientes = data;
        },

        error: (err) => {
          console.error(err);
        }

      });
  }

  abrirDialog(cliente?: any): void {

    const dialogRef = this.dialog.open(
      ClienteDialogComponent,
      {
        width: '500px',
        data: cliente || null
      }
    );

    dialogRef.afterClosed()
      .subscribe(result => {

        if (result) {
          this.obtenerClientes();
        }

      });
  }

  eliminarCliente(id: string): void {

    this.http.delete(`${this.apiUrl}/${id}`)
      .subscribe({

        next: () => {
          this.obtenerClientes();
        },

        error: (err) => {
          console.error(err);
        }

      });
  }

  activarCliente(id: string): void {

    this.http.put(
      `${this.apiUrl}/${id}/activar`,
      {}
    )
    .subscribe({

      next: () => {
        this.obtenerClientes();
      },

      error: (err) => {
        console.error(err);
      }

    });
  }
}