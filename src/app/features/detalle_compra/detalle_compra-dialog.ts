import { CommonModule, NgFor } from '@angular/common';

import {
  Component,
  inject,
  OnInit
} from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  FormControl
} from '@angular/forms';

import {
  HttpClient
} from '@angular/common/http';

import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';

import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';

import {
  MatAutocompleteModule
} from '@angular/material/autocomplete';

@Component({
  selector: 'app-detalle-compra-dialog',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    NgFor,
  ],

  templateUrl: './detalle_compra-dialog.html',
})

export class DetalleCompraDialogComponent implements OnInit {

  private readonly fb = inject(FormBuilder);

  private readonly http = inject(HttpClient);

  private readonly dialogRef =
    inject(MatDialogRef<DetalleCompraDialogComponent>);

  readonly data = inject(MAT_DIALOG_DATA);

  apiUrl = 'http://localhost:8000/detalles-compra';

  productosUrl = 'http://localhost:8000/productos';

  productos: any[] = [];

  productosFiltrados: any[] = [];

  productoSeleccionado: any = null;

  productoControl = new FormControl('');

  readonly form = this.fb.nonNullable.group({

    cantidad: [
      1,
      [
        Validators.required,
        Validators.min(1)
      ]
    ],

    subtotal: [
      0,
      [
        Validators.required,
        Validators.min(0)
      ]
    ],

  });

  ngOnInit(): void {

    this.obtenerProductos();

    this.productoControl.valueChanges
  .subscribe((value: any) => {

    const texto = typeof value === 'string'
      ? value.toLowerCase()
      : value?.nombre?.toLowerCase() || '';

    this.productosFiltrados =
      this.productos.filter(p =>
        p.nombre.toLowerCase().includes(texto)
      );

  });

    this.form.controls.cantidad.valueChanges
      .subscribe(() => {

        this.actualizarSubtotal();

      });

    if (this.data?.mode === 'edit' && this.data?.row) {

      this.productoSeleccionado = {
        id_producto: this.data.row.id_producto,
        nombre: this.data.row.nombre_producto,
        precio: this.data.row.precio || 0,
      };

      this.productoControl.setValue(
        this.productoSeleccionado
      );

      this.form.patchValue({
        cantidad: this.data.row.cantidad,
        subtotal: this.data.row.subtotal,
      });

    }

  }

  obtenerProductos(): void {

    this.http.get<any[]>(this.productosUrl)
      .subscribe({

        next: (resp) => {

          this.productos = resp;

          this.productosFiltrados = resp;

        },

        error: (err) => {

          console.error(err);

        }

      });

  }

  seleccionarProducto(producto: any): void {

    this.productoSeleccionado = producto;

    this.actualizarSubtotal();

  }

  actualizarSubtotal(): void {

    if (!this.productoSeleccionado) {
      return;
    }

    const cantidad =
      Number(this.form.controls.cantidad.value);

    const precio =
      Number(this.productoSeleccionado.precio);

    this.form.patchValue({

      subtotal: cantidad * precio

    });

  }

  displayProducto(producto: any): string {

    return producto?.nombre || '';

  }

  cancel(): void {

    this.dialogRef.close(false);

  }

  save(): void {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;

    }

    if (!this.productoSeleccionado) {

      alert('Debe seleccionar un producto');

      return;

    }

    const v = this.form.getRawValue();

    const payload = {

      id_producto:
        this.productoSeleccionado.id_producto,

      id_compra:
        this.data.id_compra,

      cantidad:
        Number(v.cantidad),

      subtotal:
        Number(v.subtotal),

    };

    if (this.data?.mode === 'edit' && this.data?.row) {

      this.http.put(
        `${this.apiUrl}/${this.data.row.id_detalle}`,
        payload
      )
      .subscribe({

        next: () => {

          this.dialogRef.close(true);

        },

        error: (err) => {

          console.error(err);

        }

      });

      return;

    }

    this.http.post(
      `${this.apiUrl}/`,
      payload
    )
    .subscribe({

      next: () => {

        this.dialogRef.close(true);

      },

      error: (err) => {

        console.error(err);

      }

    });

  }

}