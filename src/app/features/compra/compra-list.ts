import { CommonModule } from '@angular/common';

import {
  Component,
  OnInit
} from '@angular/core';

import {
  HttpClient,
  HttpClientModule
} from '@angular/common/http';

import { MatDialog } from '@angular/material/dialog';

import { MatTableModule } from '@angular/material/table';

import { MatButtonModule } from '@angular/material/button';

import { MatIconModule } from '@angular/material/icon';

import { CompraDialogComponent }
from '../compra/compra-dialog';

@Component({
  selector: 'app-compra-list',

  standalone: true,

  imports: [
    CommonModule,
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],

  templateUrl: './compra-list.html',
})

export class CompraListComponent implements OnInit {

  apiUrl = 'http://localhost:8000/compras';

  compras: any[] = [];

  displayedColumns: string[] = [
    'id',
    'doc_cliente',
    'doc_empleado',
    'total',
    'fecha_hora',
    'activo',
    'acciones'
  ];

  constructor(

    private http: HttpClient,

    private dialog: MatDialog

  ) {}

  ngOnInit(): void {

    this.obtenerCompras();

  }

  obtenerCompras(): void {

    this.http.get<any[]>(this.apiUrl)
      .subscribe({

        next: (resp) => {

          this.compras = resp;

        },

        error: (err) => {

          console.error(err);

        }

      });

  }

  abrirDialog(compra?: any): void {

    const dialogRef = this.dialog.open(
      CompraDialogComponent,
      {
        width: '500px',
        data: compra || null
      }
    );

    dialogRef.afterClosed()
      .subscribe((resp) => {

        if (resp) {

          this.obtenerCompras();

        }

      });

  }

  eliminarCompra(id: string): void {

    this.http.delete(

      `${this.apiUrl}/${id}`

    )
    .subscribe({

      next: () => {

        this.obtenerCompras();

      },

      error: (err) => {

        console.error(err);

      }

    });

  }

  activarCompra(id: string): void {

    this.http.put(

      `${this.apiUrl}/${id}/activar`,
      {}

    )
    .subscribe({

      next: () => {

        this.obtenerCompras();

      },

      error: (err) => {

        console.error(err);

      }

    });

  }

}