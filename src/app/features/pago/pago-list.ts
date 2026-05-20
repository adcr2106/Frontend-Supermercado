import { CommonModule } from '@angular/common';

import {
  Component,
  OnInit
} from '@angular/core';

import {
  HttpClient,
  HttpClientModule
} from '@angular/common/http';

import { forkJoin } from 'rxjs';

import {
  MatDialog,
  MatDialogModule
} from '@angular/material/dialog';

import { MatTableModule } from '@angular/material/table';

import { MatButtonModule } from '@angular/material/button';

import { PagoDialogComponent }
from './pago-dialog';

@Component({
  selector: 'app-pago-list',

  standalone: true,

  imports: [
    CommonModule,
    HttpClientModule,
    MatDialogModule,
    MatTableModule,
    MatButtonModule,
  ],

  templateUrl: './pago-list.html',
})

export class PagoListComponent implements OnInit {

  comprasUrl =
    'http://localhost:8000/compras';

  pagosUrl =
    'http://localhost:8000/pagos';

  compras: any[] = [];

  mostrarTodas = false;

  displayedColumns: string[] = [
    'id',
    'cliente',
    'empleado',
    'total',
    'pagado',
    'saldo',
    'acciones'
  ];

  constructor(

    private http: HttpClient,

    private dialog: MatDialog,

  ) {}

  ngOnInit(): void {

    this.obtenerCompras();

  }

  cambiarVista(valor: boolean): void {

    this.mostrarTodas = valor;

    this.obtenerCompras();

  }

  obtenerCompras(): void {

    this.http.get<any[]>(
      `${this.comprasUrl}/`
    )
    .subscribe({

      next: (compras) => {

        const peticiones = compras.map((c) =>

          this.http.get<any[]>(
            `${this.pagosUrl}/compra/${c.id}`
          )

        );

        forkJoin(peticiones)
          .subscribe({

            next: (pagosPorCompra) => {

              const data = compras.map(
                (compra, index) => {

                  const pagos =
                    pagosPorCompra[index];

                  const totalPagado =
                    pagos.reduce(

                      (acc, p) =>
                        acc + Number(p.monto),

                      0

                    );

                  return {

                    ...compra,

                    total_pagado:
                      totalPagado,

                  };

                }
              );

              if (this.mostrarTodas) {

                this.compras = data;

              } else {

                this.compras = data.filter(

                  (c) =>
                    c.total_pagado < c.total

                );

              }

            },

            error: (err) => {

              console.error(err);

            }

          });

      },

      error: (err) => {

        console.error(err);

      }

    });

  }

  abrirDialog(compra: any): void {

    const dialogRef = this.dialog.open(

      PagoDialogComponent,

      {
        width: '500px',

        data: compra
      }

    );

    dialogRef.afterClosed()
      .subscribe((result) => {

        if (result) {

          this.obtenerCompras();

        }

      });

  }

}