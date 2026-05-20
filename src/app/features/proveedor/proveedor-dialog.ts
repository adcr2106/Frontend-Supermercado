import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

import { Component, inject } from '@angular/core';

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

export interface ProveedorDialogData {
  mode: 'create' | 'edit';
  row?: any;
}

@Component({
  selector: 'app-proveedor-dialog',

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

  templateUrl: './proveedor-dialog.html',
})

export class ProveedorDialogComponent {

  private readonly fb =
    inject(FormBuilder);

  private readonly http =
    inject(HttpClient);

  private readonly dialogRef =
    inject(MatDialogRef<ProveedorDialogComponent, boolean>);

  private readonly snack =
    inject(MatSnackBar);

  readonly data =
    inject<ProveedorDialogData>(MAT_DIALOG_DATA);

  readonly apiUrl =
    'http://localhost:8000/proveedores';

  readonly form =
    this.fb.nonNullable.group({

      nombre: [
        '',
        Validators.required
      ],

    });

  constructor() {

    if (
      this.data.mode === 'edit' &&
      this.data.row
    ) {

      const r = this.data.row;

      this.form.patchValue({
        nombre: r.nombre,
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
          nombre: v.nombre,
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
      `${this.apiUrl}/${this.data.row.id_proveedor}`,
      {
        nombre: v.nombre,
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
