import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { MatTableModule } from '@angular/material/table';

import { MatButtonModule } from '@angular/material/button';

import { MatIconModule } from '@angular/material/icon';

import { ProveedorDialogComponent } from './proveedor-dialog';

@Component({
  selector: 'app-proveedores-list',

  standalone: true,

  imports: [
    CommonModule,
    HttpClientModule,
    MatDialogModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
  ],

  templateUrl: './proveedor-list.html',

  styleUrls: ['./proveedor-list.scss'],
})

export class ProveedorListComponent implements OnInit {

  proveedores: any[] = [];

  displayedColumns: string[] = [
    'nombre',
    'activo',
    'acciones'
  ];

  apiUrl = 'http://localhost:8000/proveedores';

  constructor(
    private http: HttpClient,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.obtenerProveedores();
  }

  obtenerProveedores(): void {

    this.http.get<any[]>(`${this.apiUrl}/`)
      .subscribe({

        next: (data) => {
          this.proveedores = data;
        },

        error: (err) => {
          console.error(err);
        }

      });
  }

  abrirDialog(proveedor?: any): void {

    const dialogRef = this.dialog.open(
      ProveedorDialogComponent,
      {
        width: '400px',

        data: proveedor
          ? {
              mode: 'edit',
              row: proveedor
            }
          : {
              mode: 'create'
            }
      }
    );

    dialogRef.afterClosed()
      .subscribe(result => {

        if (result) {
          this.obtenerProveedores();
        }

      });
  }

  eliminarProveedor(id: string): void {

    this.http.delete(`${this.apiUrl}/${id}`)
      .subscribe({

        next: () => {
          this.obtenerProveedores();
        },

        error: (err) => {
          console.error(err);
        }

      });
  }

  activarProveedor(id: string): void {

    this.http.put(
      `${this.apiUrl}/${id}/activar`,
      {}
    )
    .subscribe({

      next: () => {
        this.obtenerProveedores();
      },

      error: (err) => {
        console.error(err);
      }

    });
  }
}
