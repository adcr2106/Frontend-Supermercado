import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { MatTableModule } from '@angular/material/table';

import { MatButtonModule } from '@angular/material/button';

import { MatIconModule } from '@angular/material/icon';

import { CategoriaDialogComponent } from './categoria-dialog';

@Component({
  selector: 'app-categoria-list',

  standalone: true,

  imports: [
    CommonModule,
    HttpClientModule,
    MatDialogModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
  ],

  templateUrl: './categoria-list.html',

  styleUrls: ['./categoria-list.scss'],
})

export class CategoriaListComponent implements OnInit {

  categorias: any[] = [];

  displayedColumns: string[] = [
    'nombre',
    'activo',
    'acciones'
  ];

  apiUrl = 'http://localhost:8000/categorias';

  constructor(
    private http: HttpClient,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.obtenerCategorias();
  }

  obtenerCategorias(): void {

    this.http.get<any[]>(`${this.apiUrl}/`)
      .subscribe({

        next: (data) => {
          this.categorias = data;
        },

        error: (err) => {
          console.error(err);
        }

      });
  }

  abrirDialog(categoria?: any): void {

    const dialogRef = this.dialog.open(
      CategoriaDialogComponent,
      {
        width: '400px',

        data: categoria
          ? {
              mode: 'edit',
              row: categoria
            }
          : {
              mode: 'create'
            }
      }
    );

    dialogRef.afterClosed()
      .subscribe(result => {

        if (result) {
          this.obtenerCategorias();
        }

      });
  }

  eliminarCategoria(id: string): void {

    this.http.delete(`${this.apiUrl}/${id}`)
      .subscribe({

        next: () => {
          this.obtenerCategorias();
        },

        error: (err) => {
          console.error(err);
        }

      });
  }

  activarCategoria(id: string): void {

    this.http.put(
      `${this.apiUrl}/${id}/activar`,
      {}
    )
    .subscribe({

      next: () => {
        this.obtenerCategorias();
      },

      error: (err) => {
        console.error(err);
      }

    });
  }
}
