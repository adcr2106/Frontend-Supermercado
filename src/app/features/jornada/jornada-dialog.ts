import { CommonModule } from '@angular/common';

import {
  Component,
  OnInit
} from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  HttpClient,
  HttpClientModule
} from '@angular/common/http';

import {
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';

import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';

import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-jornada-dialog',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],

  templateUrl: './jornada-dialog.html',
})

export class JornadaDialogComponent implements OnInit {

  apiUrl = 'http://localhost:8000/jornadas';

  empleadosUrl = 'http://localhost:8000/empleados';

  cajasUrl = 'http://localhost:8000/cajas-registradoras';

  empleados: any[] = [];

  cajas: any[] = [];

  form;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private dialogRef: MatDialogRef<JornadaDialogComponent>,
  ) {

    this.form = this.fb.group({

      id_empleado: [
        '',
        Validators.required
      ],

      id_caja: [
        '',
        Validators.required
      ],

    });
  }

  ngOnInit(): void {

    this.obtenerEmpleados();

    this.obtenerCajas();
  }

  obtenerEmpleados(): void {

    this.http.get<any[]>(`${this.empleadosUrl}/`)
      .subscribe({

        next: (data) => {
          this.empleados = data.filter(e => e.activo);
        },

        error: (err) => {
          console.error(err);
        }

      });
  }

  obtenerCajas(): void {

    this.http.get<any[]>(`${this.cajasUrl}/`)
      .subscribe({

        next: (data) => {
          this.cajas = data.filter(c => c.activo);
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

    this.http.post(
      `${this.apiUrl}/`,
      this.form.value
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

  cerrar(): void {
    this.dialogRef.close(false);
  }
}