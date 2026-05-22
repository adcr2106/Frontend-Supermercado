import { CommonModule } from '@angular/common';

import {
  Component,
  OnInit
} from '@angular/core';

import {
  HttpClient,
  HttpClientModule
} from '@angular/common/http';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import {
  MatDialog,
  MatDialogModule
} from '@angular/material/dialog';

import { MatTableModule } from '@angular/material/table';

import { MatButtonModule } from '@angular/material/button';

import { forkJoin } from 'rxjs';

import { DetalleCompraDialogComponent } from './detalle_compra-dialog';

@Component({
  selector: 'app-detalle-compra-list',

  standalone: true,

  imports: [
    CommonModule,
    HttpClientModule,
    MatDialogModule,
    MatTableModule,
    MatButtonModule,
  ],

  templateUrl: './detalle_compra-list.html',
})

export class DetalleCompraListComponent implements OnInit {

  apiUrl = 'http://localhost:8000/detalles-compra';

  compraUrl = 'http://localhost:8000/compras';

  productosUrl = 'http://localhost:8000/productos';

  idCompra = '';

  detalles: any[] = [];

  compra: any = null;

  totalCompra = 0;

  displayedColumns: string[] = [
    'producto',
    'cantidad',
    'subtotal',
    'acciones'
  ];

  constructor(

    private http: HttpClient,

    private dialog: MatDialog,

    private route: ActivatedRoute,

    private router: Router,

  ) {}

  ngOnInit(): void {

    this.idCompra =
      this.route.snapshot.queryParamMap.get('id_compra') || '';

    this.obtenerCompra();

    this.obtenerDetalles();

  }

  obtenerCompra(): void {

    this.http.get<any>(
      `${this.compraUrl}/${this.idCompra}`
    )
    .subscribe({

      next: (resp) => {

        this.compra = resp;

      },

      error: (err) => {

        console.error(err);

      }

    });

  }

  obtenerDetalles(): void {

    this.http.get<any[]>(
      `${this.apiUrl}/compra/${this.idCompra}`
    )
    .subscribe({

      next: (resp) => {

        if (resp.length === 0) {

          this.detalles = [];

          this.totalCompra = 0;

          return;

        }

        const peticiones = resp.map((detalle) =>

          this.http.get<any>(
            `${this.productosUrl}/${detalle.id_producto}`
          )

        );

        forkJoin(peticiones)
          .subscribe({

            next: (productos) => {

              this.detalles = resp.map((detalle, index) => ({

                ...detalle,

                nombre_producto:
                  productos[index]?.nombre || 'Sin nombre',

              }));

              this.calcularTotal();

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

  calcularTotal(): void {

    this.totalCompra =
      this.detalles.reduce(

        (acc, item) => acc + Number(item.subtotal),

        0

      );

  }

  abrirDialog(): void {

    const dialogRef = this.dialog.open(
      DetalleCompraDialogComponent,
      {
        width: '500px',

        data: {
          mode: 'create',
          id_compra: this.idCompra
        }
      }
    );

    dialogRef.afterClosed()
      .subscribe((result) => {

        if (result) {

          this.obtenerDetalles();

        }

      });

  }

  finalizarCompra(): void {

    this.http.put(
      `${this.compraUrl}/${this.idCompra}`,
      {
        total: this.totalCompra
      }
    )
    .subscribe({

      next: () => {

        alert('Compra finalizada correctamente');

        this.router.navigate(['/app/compras']);

      },

      error: (err) => {

        console.error(err);

      }

    });

  }

  eliminarDetalle(id: string): void {

    this.http.delete(
      `${this.apiUrl}/${id}`
    )
    .subscribe({

      next: () => {

        this.obtenerDetalles();

      },

      error: (err) => {

        console.error(err);

      }

    });

  }

}