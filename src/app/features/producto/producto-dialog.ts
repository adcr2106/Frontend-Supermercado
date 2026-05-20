import { CommonModule } from '@angular/common';

import {
  Component,
  Inject,
  OnInit
} from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  HttpClient,
  HttpClientModule
} from '@angular/common/http';

import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';

import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';

import { MatButtonModule } from '@angular/material/button';

import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-producto-dialog',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],

  templateUrl: './producto-dialog.html',
})

export class ProductoDialogComponent implements OnInit {

  form: FormGroup;

  categorias: any[] = [];

  proveedores: any[] = [];

  apiProductos = 'http://localhost:8000/productos';

  apiCategorias = 'http://localhost:8000/categorias';

  apiProveedores = 'http://localhost:8000/proveedores';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,

    private dialogRef: MatDialogRef<ProductoDialogComponent>,

    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {

    this.form = this.fb.group({

      nombre: [
        '',
        Validators.required
      ],

      precio: [
        0,
        Validators.required
      ],

      stock: [
        0,
        Validators.required
      ],

      id_categoria: [
        '',
        Validators.required
      ],

      id_proveedor: [
        '',
        Validators.required
      ],
    });
  }

  ngOnInit(): void {

    this.obtenerCategorias();

    this.obtenerProveedores();

    if (this.data) {

      this.form.patchValue({

        nombre: this.data.nombre,

        precio: this.data.precio,

        stock: this.data.stock,

        id_categoria: this.data.id_categoria,

        id_proveedor: this.data.id_proveedor,
      });
    }
  }

  obtenerCategorias(): void {

    this.http.get<any[]>(`${this.apiCategorias}/`)
      .subscribe({

        next: (data) => {
          this.categorias = data;
        },

        error: (err) => {
          console.error(err);
        }

      });
  }

  obtenerProveedores(): void {

    this.http.get<any[]>(`${this.apiProveedores}/`)
      .subscribe({

        next: (data) => {
          this.proveedores = data;
        },

        error: (err) => {
          console.error(err);
        }

      });
  }

  guardar(): void {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;
    }

    const body = this.form.value;

    // Crear
    if (!this.data) {

      this.http.post(
        `${this.apiProductos}/`,
        body
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

    // Editar
    this.http.put(
      `${this.apiProductos}/${this.data.id_producto}`,
      body
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

  cancelar(): void {
    this.dialogRef.close();
  }
}
