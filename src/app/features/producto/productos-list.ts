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

import { ProductoDialogComponent } from './producto-dialog';

@Component({
  selector: 'app-productos-list',

  standalone: true,

  imports: [
    CommonModule,
    HttpClientModule,
    MatDialogModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
  ],

  templateUrl: './productos-list.html',

  styleUrls: ['./productos-list.scss'],
})

export class ProductosListComponent implements OnInit {

  productos: any[] = [];

  displayedColumns: string[] = [
    'nombre',
    'precio',
    'stock',
    'activo',
    'acciones'
  ];

  apiUrl = 'http://localhost:8000/productos';

  constructor(
    private http: HttpClient,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(): void {

    this.http.get<any[]>(`${this.apiUrl}/`)
      .subscribe({

        next: (data) => {
          this.productos = data;
        },

        error: (err) => {
          console.error(err);
        }

      });
  }

  abrirDialog(producto?: any): void {

    const dialogRef = this.dialog.open(
      ProductoDialogComponent,
      {
        width: '500px',
        data: producto || null
      }
    );

    dialogRef.afterClosed()
      .subscribe(result => {

        if (result) {
          this.obtenerProductos();
        }

      });
  }

  eliminarProducto(id: string): void {

    this.http.delete(`${this.apiUrl}/${id}`)
      .subscribe({

        next: () => {
          this.obtenerProductos();
        },

        error: (err) => {
          console.error(err);
        }

      });
  }

  activarProducto(id: string): void {

    this.http.put(
      `${this.apiUrl}/${id}/activar`,
      {}
    )
    .subscribe({

      next: () => {
        this.obtenerProductos();
      },

      error: (err) => {
        console.error(err);
      }

    });
  }
}
