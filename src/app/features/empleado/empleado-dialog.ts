import { CommonModule } from '@angular/common';

import { HttpErrorResponse } from '@angular/common/http';

import {
  Component,
  inject
} from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';

import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';

import {
  MatSnackBar,
  MatSnackBarModule
} from '@angular/material/snack-bar';

import { HttpClient } from '@angular/common/http';

export interface EmpleadoDialogData {
  mode: 'create' | 'edit';
  row?: any;
}

@Component({
  selector: 'app-empleado-dialog',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
  ],

  templateUrl: './empleado-dialog.html',
})

export class EmpleadoDialogComponent {

  private readonly fb =
    inject(FormBuilder);

  private readonly http =
    inject(HttpClient);

  private readonly dialogRef =
    inject(MatDialogRef<EmpleadoDialogComponent, boolean>);

  private readonly snack =
    inject(MatSnackBar);

  readonly data =
    inject<EmpleadoDialogData>(MAT_DIALOG_DATA);

  readonly apiUrl =
    'http://localhost:8000/empleados';

  readonly form =
    this.fb.nonNullable.group({

      documento: ['', Validators.required],

      nombre: ['', Validators.required],

      salario: [0, Validators.required],

      cargo: ['', Validators.required],

      contrasena: ['', Validators.required],

      telefono: [''],

      correo: [''],
    });

  constructor() {

    if (
      this.data.mode === 'edit' &&
      this.data.row
    ) {

      const r = this.data.row;

      this.form.patchValue({

        documento: r.documento,

        nombre: r.nombre,

        salario: r.salario,

        cargo: r.cargo,

        telefono: r.telefono ?? '',

        correo: r.correo ?? '',
      });
    }
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

  save(): void {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;
    }

    const v =
      this.form.getRawValue();

    if (this.data.mode === 'create') {

      this.http.post(
        `${this.apiUrl}/`,
        {
          documento: v.documento,
          nombre: v.nombre,
          salario: Number(v.salario),
          cargo: v.cargo,
          contrasena: v.contrasena,
          telefono: v.telefono || null,
          correo: v.correo || null,
          creado_por: 'admin',
        }
      )
      .subscribe({

        next: () => {
          this.dialogRef.close(true);
        },

        error: (
          err: HttpErrorResponse
        ) => {

          this.snack.open(
            this.msg(err),
            'Cerrar',
            { duration: 5000 }
          );
        }

      });

      return;
    }

    this.http.put(
      `${this.apiUrl}/${this.data.row.id}`,
      {
        documento: v.documento,
        nombre: v.nombre,
        salario: Number(v.salario),
        cargo: v.cargo,
        contrasena: v.contrasena || undefined,
        telefono: v.telefono || null,
        correo: v.correo || null,
        actualizado_por: 'admin',
      }
    )
    .subscribe({

      next: () => {
        this.dialogRef.close(true);
      },

      error: (
        err: HttpErrorResponse
      ) => {

        this.snack.open(
          this.msg(err),
          'Cerrar',
          { duration: 5000 }
        );
      }

    });
  }

  private msg(
    err: HttpErrorResponse
  ): string {

    const d = err.error?.detail;

    if (typeof d === 'string') {
      return d;
    }

    if (Array.isArray(d)) {

      return d
        .map(
          (x) =>
            x.msg ??
            JSON.stringify(x)
        )
        .join('; ');
    }

    return err.message;
  }
}
